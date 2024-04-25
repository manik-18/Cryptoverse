import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
  "X-RapidAPI-Host": import.meta.env.VITE_CRYPTO_NEWS_API_HOST,
};

const baseUrl = "https://duckduckgo10.p.rapidapi.com/search";

const createRequest = (url, params) => ({
  url,
  params,
  headers: cryptoNewsHeaders,
});

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory }) =>
        createRequest("/news", {
          safeSearch: "off",
          term: newsCategory,
          region: "in-en",
          time: "a",
        }),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
