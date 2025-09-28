import React from "react";
import Script from "next/script";

async function getArticle(slug: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/articles/slug/" + slug,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "api-key " + process.env.NEXT_PUBLIC_API_KEY,
        Accept: "application/json",
      },
    }
  );
  return res.json();
}

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ articleSlug: string }>;
  searchParams: Promise<{ lang?: "en" | "id" }>;
}) => {
  const { articleSlug } = await params;
  const data = await getArticle(articleSlug);
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

      <div className="flex flex-col text-gray-600">{formattedDate}</div>
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
