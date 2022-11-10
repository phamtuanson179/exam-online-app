export const resolveFilter = () => {};

export const convertToFilterString = ({ key, operator, value }) => {
  if (!key || !operator || !value) return "";
  return `${key}${operator}${value}`;
};
