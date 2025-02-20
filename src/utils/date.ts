export const formatDateToYesterday = () => {
  const today = new Date();
  today.setDate(today.getDate() - 1);

  // Returns date in YYYY-MM-DD format
  return today.toISOString().split("T")[0];
};

export const getpublicationTime = (dateString: string) => {
  // Extract the date portion (YYYY-MM-DD) from the full ISO string
  return dateString.split("T")[0];
};
