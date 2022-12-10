export const searchElementById = (id, listElements) => {
  return listElements?.find((item) => item._id == id);
};

export const findElementOfArray1OutOfArray2 = (array1, array2) => {
  return array1.filter((item) => !array2.includes(item));
};
