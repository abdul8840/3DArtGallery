export const createSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const createUniqueSlug = async (Model, text, id = null) => {
  let slug = createSlug(text);
  let slugExists = true;
  let counter = 1;
  let finalSlug = slug;

  while (slugExists) {
    const query = id ? { slug: finalSlug, _id: { $ne: id } } : { slug: finalSlug };
    const existing = await Model.findOne(query);

    if (!existing) {
      slugExists = false;
    } else {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }
  }

  return finalSlug;
};