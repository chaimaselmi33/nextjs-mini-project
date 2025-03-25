export const checkExpiration = (expireDate: string): boolean => {
  const [month, year] = expireDate.split("/").map((ele) => parseInt(ele));
  const fullYear = 2000 + year;
  const expirationDate = new Date(fullYear, month - 1, 1);
  const currentDate = new Date();

  return currentDate > expirationDate;
};
