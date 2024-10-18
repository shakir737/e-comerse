import { api } from "../../state/api";
import { getProducts } from "./productsSlice";

export const productApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (data) => ({
                url: "/product",
                method: "POST",
                body: data ,
                credentials: "include",
            })
        }),
        getProduct: builder.mutation({
            
            query: () => ({
                url: "/product",
                method: "GET",
                credentials: "include",
            }),
            async onQueryStarted(arg, {queryFulfilled,dispatch}){
                try{
                    
                    const result = await queryFulfilled;
                   
                    dispatch( getProducts( result.data )  );
                } catch (error) {
                    return error;
                }
            }
        }),
        updateProduct: builder.mutation({
            
            query: (data) => ({
                
                url: `/product/${data.id}`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            async onQueryStarted(arg, {queryFulfilled,dispatch}){
                try{
                    const result = await queryFulfilled;
                   
                    dispatch( getProducts( result.data )  );
                } catch (error) {
                    return error;
                }
            }
        
        }),

    }),
});

export const {useGetProductMutation, useCreateProductMutation, useUpdateProductMutation } = productApi;
 