import moment from "moment/moment";
export const useDate = (timestamp) => {
  return moment(timestamp).format("l");
};
