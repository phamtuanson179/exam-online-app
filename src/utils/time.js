import moment from "moment/moment";
export const convertDate = (timestamp) => {
  return moment(timestamp).format("L");
};
