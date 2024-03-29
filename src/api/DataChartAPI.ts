export const getData = async (fingerNumber:number) => {
  const response = await fetch(`http://localhost:4000/latestData/${fingerNumber}`);
  const data = await response.json();
  return data;
};
