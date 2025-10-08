import {
  Article,
  ListCatArticles,
  ListSlugs,
  ListArticles,
} from "@/interfaces/articles";
import { List } from "postcss/lib/list";

export async function getArticles(): Promise<ListCatArticles> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "api/articles/group/tags",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "api-key " + process.env.NEXT_PUBLIC_API_KEY,
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const categories: ListCatArticles = await res.json();
  return categories;
}

export async function getAllArticles(): Promise<ListSlugs> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "api/articles/all",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "api-key " + process.env.NEXT_PUBLIC_API_KEY,
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const allArticles: ListSlugs = await res.json();
  return allArticles;
}

export async function getArticlebySlug(slug: string): Promise<Article> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "api/articles/slug/" + slug,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "api-key " + process.env.NEXT_PUBLIC_API_KEY,
        Accept: "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const articleData: Article = await res.json();
  return articleData;
}

type CallbackFunction = (articles: ListArticles) => void;

export async function searchArticle(q: string, setData: CallbackFunction) {
  const article: Article = {
    short:
      'Recently I bought a book about marketing. I bought this used book "*Dasar-Dasar Marketing*" by Jerome McCarthy. In english version it called "Essentials of Marketing", I bought this book because I want to know a little bit about marketing, but I don\'t know the book was old. It first **published in 1...',
    tags: ["marketing"],
    image: "https://go.dev/doc/gopher/gopher5logo.jpg",
    timestamp: "2025-10-04T17:03:35.472135Z",
    title: "Essentials of Marketing by Jerome McCarthy",
    slug: "ini-contoh-title-dengan-tags-learning-f17ba968",
    status: "P",
    edited: false,
    minutes: 1,
    newsletter: "fe23fa6c-d9b7-4150-8d81-2a3f05009456",
  };
  const article1: Article = {
    short:
      'Recently I bought a book about marketing. I bought this used book "*Dasar-Dasar Marketing*" by Jerome McCarthy. In english version it called "Essentials of Marketing", I bought this book because I want to know a little bit about marketing, but I don\'t know the book was old. It first **published in 1...',
    tags: ["marketing"],
    image: "https://go.dev/doc/gopher/gopher5logo.jpg",
    timestamp: "2025-10-04T17:03:35.472135Z",
    title: "Essentials of Marketing by Jerome McCarthy",
    slug: "ini-contoh-title-dengan-tags-learning-f17ba968",
    status: "P",
    edited: false,
    minutes: 1,
    newsletter: "fe23fa6c-d9b7-4150-8d81-2a3f05009456",
  };
  const articles: ListArticles = [article, article1];
  setData(articles);
}
