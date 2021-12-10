import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_CRYPTONEWSBASEURL;

const cryptoNewsApiHeaders = {
  "x-rapidapi-host": process.env.REACT_APP_CRPYTONEWSAPIHOST,
  "x-rapidapi-key": process.env.REACT_APP_CRPYTONEWSAPIKEY,
};

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&freshness=Day&textFormat=Raw&safeSearch=Off&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
