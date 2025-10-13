import React from "react";
import Link from "next/link";
import { getArticles } from "@/lib/api";

const page = async () => {
  const data = await getArticles();
  return (
    <div className="flex flex-col bg-white flex-1 w-full justify-start md:justify-center items-center gap-10 md:gap-20 overflow-y-scroll px-5 py-10 md:px-0 md:py-0">
      <div className="flex flex-col gap-2 justify-center items-center md:w-[700px]">
        <img src={"images/logo.png"} alt="Nanda's blog" className="w-[100px]" />
        <div className="">
          Hi! 👋 I am Nanda Anzana, Im a data scientist. In my opinion, there
          are 3 steps of learning: read, write, and understand.{" "}
          <b>I write to understand </b>, because the dots are connected when I
          sit and put my mind on it. You can check my articles below!
        </div>
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
                  className="hover:text-green-300"
                >
                  {article.title}
                </Link>
              ))}
              <Link href={`/search?q=${val.tag}`} className="underline">
                more...
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
