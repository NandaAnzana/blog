import {
  Article,
  ListCatArticles,
  ListSlugs,
  ListArticles,
} from "@/interfaces/articles";

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

export function searchArticle(
  q: string,
  setData: CallbackFunction,
  page: number = 1
) {
  fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/articles/search?q=${q}&page=${page}&size=5`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "api-key " + process.env.NEXT_PUBLIC_API_KEY,
        Accept: "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      setData(data.results);
    });
}
