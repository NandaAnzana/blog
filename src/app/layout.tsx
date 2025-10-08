import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nanda's Blog",
  description: "Hi! 👋 I am Nanda Anzana, Im a data scientist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          id="MathJax-script"
          async
          src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"
        ></script>
      </head>
      <body className="flex flex-col w-[100vw] min-h-[100vh] bg-white overflow-y-scroll">
        <div id="modal-root"></div>
        <NavBar />
        <Suspense>{children}</Suspense>
        <Footer />
      </body>
    </html>
  );
}
