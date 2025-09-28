import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  entry: {
    reactComponentAnnotation: {
      enabled: false,
    },
  },
};

export default nextConfig;
