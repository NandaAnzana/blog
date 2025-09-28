import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-row justify-between px-10 md:px-40 py-3 md:py-5">
      <div className="flex flex-row gap-1 md:gap-3">
        <p>©2025</p>
        <p>
          Made with ♥️ by{" "}
          <a
            href="https://app.nitomeyocard.com/me/nanda-anzana"
            className="underline"
            target="_blank"
          >
            Nanda Anzana
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
