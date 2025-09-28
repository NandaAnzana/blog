export type Article = {
  article: string;
  tags: Array<string>;
  image: string;
  timestamp: string;
  title: string;
  slug: string;
  status: string;
  edited: boolean;
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
