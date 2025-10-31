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

export async function fetchToBase64(signedUrl: string | null): Promise<string> {
  if (typeof signedUrl == "string") {
    const res = await fetch(signedUrl);
    if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);
    const contentType = res.headers.get("content-type") || "image/jpeg";
    const buffer = Buffer.from(await res.arrayBuffer());
    const base64 = buffer.toString("base64");
    return `data:${contentType};base64,${base64}`;
  }
  return "";
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
  articleData.image = await fetchToBase64(articleData.image);
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
