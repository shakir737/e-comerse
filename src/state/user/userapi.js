
import { api } from "../api";
import { userList } from "./userSlice";


 export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        user: builder.mutation({
            query: () => ({
                url: "user",
                method: "GET", 
            }),
            async onQueryStarted(arg, {queryFulfilled,dispatch}){
                try{
                    const result = await queryFulfilled;
                    dispatch(
                             userList(
                                result.data
                             )
                    )
                } catch (error) {
                    console.log("")
                }
            },
           
        }),
            cart: builder.mutation({
             query: (data) => ({
                
                 url: `user/userCart/${data.userID}`,
                 method: "POST",
                 body: data,
                 credentials: "include",
                 }),
               async onQueryStarted(arg, {queryFulfilled,dispatch}){
                 try{
                     const result = await queryFulfilled;
                   
                     dispatch( userList( result.data ) );
                    } catch (error) {
                       return error;
                }
            }
         }),
         updateCart: builder.mutation({
            query: (data) => ({
               
                url: `user/updateCart`,
                method: "POST",
                body: data,
                credentials: "include",
                }),
              async onQueryStarted(arg, {queryFulfilled,dispatch}){
                try{
                    const result = await queryFulfilled;
    
                    dispatch( userList( result.data ) );
                   } catch (error) {
                      return error;
               }
           }
        }),
        deleteCart: builder.mutation({
            query: (data) => ({
               
                url: `user/removecart/${data.productID}`,
                method: "DELETE",
                body: data,
                credentials: "include",
                }),
              async onQueryStarted(arg, {queryFulfilled,dispatch}){
                try{
                    const result = await queryFulfilled;
    
                    dispatch( userList( result.data ) );
                   } catch (error) {
                      return error;
               }
           }
        }),

    }),
 });

 export const {useUserMutation, useCartMutation, useUpdateCartMutation, useDeleteCartMutation} = userApi;