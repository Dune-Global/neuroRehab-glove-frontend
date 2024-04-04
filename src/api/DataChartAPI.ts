export const getData = async (fingerNumber:number) => {
  const response = await fetch(`http://localhost:4000/latestData/${fingerNumber}`);
  const data = await response.json();
  return data;
};

export const overallAverage = async (fingerNumber:number) => {
  const response = await fetch(
    `http://localhost:4000/averageReadingValue/${fingerNumber}`
  );
  const data = await response.json();
  return data;
}

export const pulse = async (fingerNumber:number) => {
  const response = await fetch(
    `http://localhost:4000/findPeaks/${fingerNumber}`
  );
  const data = await response.json();
  return data;
}