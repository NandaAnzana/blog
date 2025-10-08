export type Article = {
  article?: string;
  tags: Array<string>;
  image: string | null;
  timestamp: string;
  title: string;
  slug: string;
  status: string;
  edited: boolean;
  short: string;
  newsletter: string;
  minutes: number;
};

type Slugs = {
  slug: string;
};

export type ListSlugs = Array<Slugs>;

type CatArticles = {
  tag: string;
  articles: Array<Article>;
};

export type ListCatArticles = Array<CatArticles>;

export type ListArticles = Array<Article>;
