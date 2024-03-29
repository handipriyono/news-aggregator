import dayjs from "dayjs";

export const formatDate = (date) => {
  try {
    return dayjs(date).format("MMMM D, YYYY");
  } catch (error) {
    return date;
  }
};

export default {
  formatDate,
};
