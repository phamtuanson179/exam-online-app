export const resolveFilter = () => {};

export const convertToFilterString = (arrFilter) => {
  if (arrFilter)
    return arrFilter
      .map(({ key, operator, value }) => {
        if (!key || !operator || !value) return "";
        return `${key}${operator}${value}`;
      })
      .filter((item) => item)
      .join(",");
  else return "";
};
