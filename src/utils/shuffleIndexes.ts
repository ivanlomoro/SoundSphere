const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

export const createShuffledIndexesObject = (array: any[]) => {
  const originalIndexes = array.map((_, index) => index);
  const shuffledIndexes = [...originalIndexes];

  shuffle(shuffledIndexes);

  const resultObject: { [key: number]: number } = {};
  originalIndexes.forEach((originalIndex, i) => {
    resultObject[originalIndex] = shuffledIndexes[i];
  });
  return resultObject;
};
