export const formatDateToYesterday = () => {
  const today = new Date();
  today.setDate(today.getDate() - 1);

  // Returns date in YYYY-MM-DD format
  return today.toISOString().split("T")[0];
};

export const getPublicationDate = (timeString: string) => {
  // Extract the date portion (YYYY-MM-DD) from the full ISO string
  const dateString = timeString.split("T")[0];
  // Split the input string by the dash ("-")
  const [year, month, day] = dateString.split("-");

  // Return the formatted date as DD.MM.YYYY - German format
  return `${day}.${month}.${year}`;
};
