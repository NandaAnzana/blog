"use client";

import React, { useEffect, useState } from "react";
import Search from "@/components/modals/Search";
import { useSearchParams } from "next/navigation";
import { searchArticle } from "@/lib/api";
import { ListArticles } from "@/interfaces/articles";
import { formatDate } from "@/utils/date";
import Link from "next/link";

const SerachPage = () => {
  const searchParams = useSearchParams();
  const [searchString, setSearchString] = useState<string | null>(
    searchParams.get("q")
  );
  const [data, setData] = useState<ListArticles>([]);
  useEffect(() => {
    if (searchParams.get("q")) {
      const q = searchParams.get("q");
      if (typeof q === "string") {
        searchArticle(q, setData);
      }
    }
  }, []);
  return (
    <div className="flex flex-col bg-white flex-1 w-full justify-start items-center gap-5 md:gap-20 overflow-y-scroll px-5 py-10 md:px-0 md:py-0">
      <div className="flex flex-col gap-10 justify-center items-center md:w-[700px] w-full">
        <Search searchString={searchString} setSearchString={setSearchString} />
        <div className="flex flex-col gap-5 w-full justify-start mt-10 divide-y-2">
          {searchString && data.length > 0
            ? data.map((val, ind) => (
                <Link
                  href={"/articles/" + val.slug}
                  key={ind}
                  className="flex flex-col gap-3 w-full pb-5"
                >
                  <div className="flex flex-col-reverse gap-3 md:gap-0 md:flex-row md:justify-between w-full">
                    <div className="flex flex-col gap-3 w-full md:w-3/4">
                      <h2 className="font-semibold text-[24px]">{val.title}</h2>
                      <p>{val.short.slice(0, 100)}...</p>
                    </div>
                    <div className="flex w-full md:w-1/4 justify-start md:justify-end">
                      {typeof val.image == "string" && (
                        <img
                          src={val.image}
                          alt=""
                          className="max-w-[150px] max-h-[150px]"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <div className="flex flex-col">
                      {formatDate(val.timestamp)}
                    </div>
                    <div>-</div>
                    <div className="flex flex-col">
                      {val.minutes} minutes read
                    </div>
                  </div>
                  <div className="flex flex-row gap-5">
                    {val.tags.map((tag, ix) => (
                      <span
                        key={ix}
                        className="text-gray-500 py-1 px-2 flex flex-col bg-gray-100 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))
            : searchString && data.length == 0
            ? "No result found"
            : null}
        </div>
      </div>
    </div>
  );
};

export default SerachPage;
