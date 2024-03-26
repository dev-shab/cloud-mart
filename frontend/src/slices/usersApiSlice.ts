import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";
import { UserType } from "../types";

type RegisterParamsType = { email: string; password: string; name: string };
type LoginParamsType = { email: string; password: string };

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserType[], LoginParamsType>({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation<UserType[], RegisterParamsType>({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  usersApiSlice;
