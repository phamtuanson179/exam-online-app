import moment from "moment/moment";
export const convertDate = (timestamp) => {
  return moment(timestamp).format("L");
};

export const convertSecondToTime = (seconds) => {
  if (seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor(seconds / 60);
    var tinySeconds = seconds % 60;
    return [hours, minutes, tinySeconds]
      .map((item) => (item < 10 ? `0${item}` : item))
      .filter((item, index) => item !== "00" || index > 0)
      .join(":");
  }
  return "---";
};
