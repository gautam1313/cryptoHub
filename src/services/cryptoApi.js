import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_CRYPTOBASEURL;

const cryptoApiHeaders = {
  "x-rapidapi-host": process.env.REACT_APP_CRPYTOAPIHOST,
  "x-rapidapi-key": process.env.REACT_APP_CRPYTOAPIKEY,
};

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery } = cryptoApi;
