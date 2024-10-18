import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import {  FaPaypal } from "react-icons/fa";
import axios from "axios";
import AddMenu from "./../dashboard/sealer/AddMenu";
import { useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import PhoneInput from "react-phone-number-input";
import { useUpdateUserMutation } from "../../state/auth/authapi";
const CheckoutForm = ({ price, cart, users }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setcardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [updateUser, { isError, isSuccess, data, error }] =
    useUpdateUserMutation();
  const navigate = useNavigate();
  console.log(users.getaUser);
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      ...users.getaUser,
    },
  });
  useEffect(() => {}, [isSuccess]);
  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.error(
        "Invalid price value. Must be a number greater than or equal to 1."
      );
      return;
    }

    axios
      .post("http://localhost:4000/create-payment-intent", { price })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [price]);
  const onSubmit = (data) => {
    const isEmailVarified = true;
    const isPhoneVarified = true;
    const varifiedUser = { ...data, isEmailVarified, isPhoneVarified };
    updateUser(varifiedUser);
  };
  // handleSubmit btn click
  const stripePavementSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      //   // Stripe.js has not loaded yet. Make sure to disable
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // // console.log('card: ', card)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setcardError(error.message);
    } else {
      // console.log('[PaymentMethod]', paymentMethod);

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: users.getaUser.firstname,
              email: users.getaUser.email,
            },
          },
        });

      if (confirmError) {
        console.log(confirmError);
      }

      if (paymentIntent.status === "succeeded") {
        const transitionId = paymentIntent.id;
        //   // save payment info to server
        const paymentInfo = {
          email: users.getaUser.email,
          transitionId: paymentIntent.id,
          price: price,
          quantity: cart.length,
          status: "order pending",
          orderDetail: cart,
          orderby: users.getaUser._id,
        };

        // send payment info
        axios
          .post("http://localhost:4000/api/orders/create-order", {
            paymentInfo,
          })
          .then((res) => {
            if (res.data) {
              alert(
                `Congragulations! your order is created successfully and Your transitionId is: ${transitionId}`
              );
              navigate("/orders");
            }
          });
      }
    }
  };
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
      {users?.getaUser?.isEmailVarified && users?.getaUser?.isEmailVarified ? (
        <div
          className={`md:w-1/3 w-full border space-y-5  card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8 `}
        >
          <h4 className="text-lg font-semibold">Process your Payment!</h4>
          <h5 className="font-medium">Credit/Debit Card</h5>
          {stripe && (
            <form onSubmit={stripePavementSubmit}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
              <button
                type="submit"
                className="btn btn-primary btn-sm mt-5 w-full"
              >
                Pay
              </button>
            </form>
          )}
          {cardError ? (
            <p className="text-red text-xs italic">{cardError}</p>
          ) : (
            ""
          )}

          <div className="mt-5 text-center">
            <hr />
            <button
              type="submit"
              className="btn  btn-sm mt-5 bg-orange-500 text-white"
            >
              Pay with Paypal
            </button>
          </div>
        </div>
      ) : (
        <div className="md:w-1/2 space-y-3 card max-w-sm shadow-2xl bg-base-100 px-4 py-8 ">
          <h4 className="text-lg font-semibold text-center justify-center">
            User Detail
          </h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <TextInput
                label="First Name:"
                name="firstname"
                register={register}
                errors={errors}
              />
            </div>
            <div>
              <TextInput
                label="Last Name:"
                name="lastname"
                register={register}
                errors={errors}
              />
            </div>
            <div>
              <TextInput
                label="Email:"
                name="email"
                register={register}
                errors={errors}
              />
            </div>
            <div>
              <TextInput
                label="Phone Number"
                name="mobile"
                register={register}
                errors={errors}
              />
              {/* <PhoneInput
              {...register(`${country}`, { required: true })}
              defaultCountry="US"
              placeholder="Mobile No"
              international
              withCountryCallingCode
              // onChange={field.onChange}
              className="input-phone"
            /> */}
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary btn-sm mt-5 w-full"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="md:w-1/2 space-y-3 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8 ">
        <h4 className="text-lg font-semibold text-center justify-center">
          Order Summary
        </h4>
        {cart.map((cart) =>
          cart.cartDetail.map((detail) => (
            <>
              <div className="flex justify-between">
                <div>{detail.orderQuantity}</div>
                <div>*</div>
                <div> ${detail.price}</div>
                <div>Total: ${detail.orderQuantity * detail.price}/-</div>
              </div>
              <hr />
            </>
          ))
        )}
        <div className="flex justify-between">
          <div>Grand Total:</div>
          <div> ${price}</div>
        </div>

        <p>Number of Items: {cart.length}</p>
      </div>
      {/* <div
        className={`md:w-1/3 w-full border space-y-5  card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8 `}
      >
        <h4 className="text-lg font-semibold">Process your Payment!</h4>
        <h5 className="font-medium">Credit/Debit Card</h5>
        {stripe && (
          <form onSubmit={stripePavementSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm mt-5 w-full"
            >
              Pay
            </button>
          </form>
        )}
        {cardError ? (
          <p className="text-red text-xs italic">{cardError}</p>
        ) : (
          ""
        )}

        <div className="mt-5 text-center">
          <hr />
          <button
            type="submit"
            className="btn  btn-sm mt-5 bg-orange-500 text-white"
          >
            Pay with Paypal
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default CheckoutForm;
