import { api } from "../../state/api";
import { getOrders } from "./ordersSlice";

export const ordersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "orders/create-order",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getOrders: builder.mutation({
      query: (data) => ({
        url: `orders/order/${data}`,
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(getOrders(result.data));
        } catch (error) {
          return error;
        }
      },
    }),
    // updateProduct: builder.mutation({
    //   query: (data) => ({
    //     url: `/product/${data.id}`,
    //     method: "POST",
    //     body: data,
    //     credentials: "include",
    //   }),
    //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //     try {
    //       const result = await queryFulfilled;

    //       dispatch(getProducts(result.data));
    //     } catch (error) {
    //       return error;
    //     }
    //   },
    // }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersMutation } = ordersApi;
