import dayjs from "dayjs";

const buildCreatedDate = (unix) => {
  const createdDate = dayjs.unix(unix);

  const diffDays = dayjs().diff(createdDate, "day");

  if (diffDays <= 0) {
    return `${dayjs().diff(createdDate, "hour")} hours ago`;
  }
  if (diffDays > 365) {
    return `${dayjs().diff(createdDate, "year")} years ago`;
  }
  if (diffDays > 0) {
    return `${diffDays} days ago`;
  }
  //   if(createDate.subtract())
};

export default buildCreatedDate;
