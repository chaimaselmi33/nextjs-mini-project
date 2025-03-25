export const formatExpiracyDate = (inputDate: string) => {
  const [month, year] = inputDate.split("/").map(Number);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${months[month - 1]}, ${2000 + year}`;
};

export const formatBirthDate = (inputDate: string) => {
  const [year, month, day] = inputDate.split("-").map(Number);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${day} ${months[month - 1]}, ${year}`;
};
