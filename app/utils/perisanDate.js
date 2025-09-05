import moment from "jalali-moment";

export function dateConverter(gregorianDate, customFormat = "DD MMM YYYY") {
  const persianDate = moment(gregorianDate).locale("fa").format(customFormat);

  return persianDate;
}
export function dateToTimeConverter(gregorianDate) {
  const persianDate = moment(gregorianDate).locale("fa").format("HH:mm");

  const hours = moment(gregorianDate).hours();

  let timeOfDay = "";
  if (hours >= 5 && hours < 12) {
    timeOfDay = "صبح";
  } else if (hours >= 12 && hours < 16) {
    timeOfDay = "ظهر";
  } else if (hours >= 16 && hours < 20) {
    timeOfDay = "عصر";
  } else {
    timeOfDay = "شب";
  }

  return `${persianDate}  ${timeOfDay}`;
}
