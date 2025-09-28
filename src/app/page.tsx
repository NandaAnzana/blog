import React from "react";
import Link from "next/link";

type Article = {
  short: string;
  tags: Array<string>;
  image: string;
  timestamp: string;
  title: string;
  slug: string;
  status: string;
  edited: boolean;
};

type CatArticles = {
  tag: string;
  articles: Array<Article>;
};

type ListCatArticles = Array<CatArticles>;

async function getPosts(): Promise<ListCatArticles> {
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

  const userData: ListCatArticles = await res.json();
  return userData;
}

const page = async () => {
  const data = await getPosts();
  return (
    <div className="flex flex-col bg-white flex-1 w-full justify-start md:justify-center items-center gap-10 md:gap-20 overflow-y-scroll px-5 py-10 md:px-0 md:py-0">
      <div className="md:w-[700px]">
        Hi! 👋 I am Nanda Anzana, Im a data scientist. In my opinion, there are
        3 steps of learning: read, write, and understand.{" "}
        <b>I write to understand </b>, because the dots are connected when I sit
        and put my mind on it. You can check my articles below!
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full md:gap-10 md:w-[700px]">
        {data.map((val, ind) => (
          <div key={ind} className="flex flex-col gap-5">
            <h2 className="text-2xl">{val.tag}</h2>
            <div className="flex flex-col gap-2">
              {val.articles.map((article, ind_) => (
                <Link
                  href={`/articles/${article.slug}`}
                  key={`${ind}${ind_}`}
                  className="hover:font-semibold"
                >
                  {article.title}
                </Link>
              ))}
              <Link href="">more...</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
