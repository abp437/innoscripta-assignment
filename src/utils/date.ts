export const formatDateToYesterday = () => {
  const today = new Date();
  today.setDate(today.getDate() - 1);

  // Returns date in YYYY-MM-DD format
  return today.toISOString().split("T")[0];
};
