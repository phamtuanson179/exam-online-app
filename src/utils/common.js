export const searchElementById = (id, listElements) => {
  return listElements?.find((item) => item._id == id);
};

export const findElementOfArray1OutOfArray2 = (array1, array2) => {
  return array1.filter((item) => !array2.includes(item));
};

export const isTwoStringArraySimilar = (arr1, arr2) => {
  if (arr1?.length === arr2?.length) {
    const amountElementOfArr = arr1?.length;
    let count = 0;
    arr1?.forEach((element1) => {
      if (arr2.find((element2) => element2 == element1)) {
        count++;
      }
    });
    if (count === amountElementOfArr) {
      return true;
    } else return false;
  } else return false;
};

export const caculateScore = (point, maxPoint) => {
  return Math.round((point / maxPoint) * 10 * 4) / 4;
};
