import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  entry: {
    reactComponentAnnotation: {
      enabled: true,
    },
  },
};

export default nextConfig;
