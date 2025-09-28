export type Props = {
  params: Promise<{ articleSlug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
