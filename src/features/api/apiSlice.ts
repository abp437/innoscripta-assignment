import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Guardian from "guardian-js";

interface NewsApiResponse {
  articles: Article[];
}

interface NYTimesResponse {
  response: {
    docs: NYTimesArticle[];
  };
}

interface GuardianResponse {
  results: GuardianArticle[];
}

interface Article {
  title: string;
  description: string;
  url: string;
  source: {
    name: string;
  };
}

interface NYTimesArticle {
  headline: { main: string };
  abstract: string;
  web_url: string;
}

interface GuardianArticle {
  webTitle: string;
  webUrl: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (builder) => ({
    getNewsApiArticles: builder.query<Article[], void>({
      query: () => ({
        url: "https://newsapi.org/v2/everything",
        params: {
          q: "Tesla",
          from: "2025-02-11",
          sortBy: "popularity",
          apiKey: import.meta.env.VITE_NEWS_API_KEY,
        },
      }),
      transformResponse: (response: NewsApiResponse) => response.articles,
    }),

    getNYTimesArticles: builder.query<Article[], void>({
      query: () => ({
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        params: {
          q: "election",
          "api-key": import.meta.env.VITE_NEW_YORK_TIMES_API_KEY,
        },
      }),
      transformResponse: (response: NYTimesResponse) =>
        response.response.docs.map((doc) => ({
          title: doc.headline.main,
          description: doc.abstract,
          url: doc.web_url,
          source: { name: "New York Times" },
        })),
    }),

    getGuardianArticles: builder.query<Article[], void>({
      queryFn: async () => {
        try {
          const guardian = new Guardian(import.meta.env.VITE_THE_GUARDIAN_API_KEY, false);
          const response = (await guardian.content.search("football")) as GuardianResponse;

          const transformedData = response.results.map((result) => ({
            title: result.webTitle,
            description: result.webTitle,
            url: result.webUrl,
            source: { name: "The Guardian" },
          }));

          return { data: transformedData };
        } catch (error) {
          return { error: { status: 500, data: error } };
        }
      },
    }),
  }),
});

export const { useGetNewsApiArticlesQuery, useGetNYTimesArticlesQuery, useGetGuardianArticlesQuery } = apiSlice;
