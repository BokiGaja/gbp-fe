export const buildCategoryPath = (
  category: { slug: string; parents?: { slug: string }[] },
  lang: string
) => {
  const slugs = category.parents
    ? [...category.parents.map((p) => p.slug), category.slug]
    : [category.slug];
  return `/${lang}/categories/${slugs.join('/')}`;
};
