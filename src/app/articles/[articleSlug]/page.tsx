import React from "react";
import Script from "next/script";
import { Metadata, ResolvingMetadata } from "next";
import { Params } from "next/dist/server/request/params";
import { ListSlugs } from "@/interfaces/articles";
import { Props } from "@/interfaces/params";
import { getAllArticles, getArticlebySlug } from "@/lib/api";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const articles: ListSlugs = await getAllArticles();
  return articles.map((post) => ({
    articleSlug: post.slug,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { articleSlug } = await params;
  if (!articleSlug) {
    return notFound();
  }
  const article = await getArticlebySlug(articleSlug);

  const title = `${article.title} | Nanda's article`;

  return {
    title,
    openGraph: {
      title,
    },
  };
}

const page = async ({
  params,
}: {
  params: Promise<{ articleSlug: string }>;
}) => {
  const { articleSlug } = await params;
  const data = await getArticlebySlug(articleSlug);
  const date = new Date(data.timestamp);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return (
    <div className="flex flex-col flex-1 gap-3 px-5 md:px-20 pb-10 bg-white w-full justify-start items-center overflow">
      <h1 className="flex flex-col w-full font-bold text-[24px] md:text-[42px] text-center">
        {data.title}
      </h1>
      <div className="flex flex-row gap-2 text-gray-600">
        <div className="flex flex-col">{formattedDate}</div>
        <div>-</div>
        <div className="flex flex-col">{data.minutes} minutes read</div>
      </div>
      {data.image && <img src={data.image} className="w-[95%] md:w-[50%]" />}

      <div className="flex flex-row justify-center items-center gap-3 flex-wrap">
        {data.tags.map((val, ind) => (
          <span
            key={ind}
            className="text-gray-500 py-1 px-2 flex flex-col bg-gray-100 rounded-lg"
          >
            {val}
          </span>
        ))}
      </div>

      <div className="w-[95%] md:w-[50%]">
        <Script strategy="lazyOnload" id="MathJax-config">
          {`window.MathJax = {
              tex: {
                inlineMath: [['$', '$']],
                displayMath: [['$$', '$$']],
                processEscapes: true,
                tags: 'ams'
              },
              config: ["MMLorHTML.js"],
              jax: ["input/TeX", "output/HTML-CSS", "output/NativeMML"],
              extensions: ["MathMenu.js", "MathZoom.js"],
              svg: {
                fontCache: 'global'
              }
            };`}
        </Script>
        <Script
          id="MathJax-script"
          strategy="lazyOnload"
          src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"
        ></Script>

        <article
          className="prose !max-w-none md:prose-2xl"
          dangerouslySetInnerHTML={{ __html: data.article }}
        ></article>
      </div>
    </div>
  );
};

export default page;
