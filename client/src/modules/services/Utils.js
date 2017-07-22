class Utils {

  static beautifyTimeText(timeInSecs) {
    if (timeInSecs !== undefined && timeInSecs.toFixed){
      var seconds = timeInSecs.toFixed(1);
      var minutes = (timeInSecs / (60)).toFixed(1);
      var hours = (timeInSecs / (60 * 60)).toFixed(1);
      if (seconds < 60) {
        return seconds + " Seconds";
      } else if (minutes < 60) {
        return minutes + " Minutes";
      } else {
        return hours + " Hours";
      }
    }
    return "";

  }

  static formatDate(d) {
    if (!isNaN(Date.parse(d))) {
      return new Date(d).toDateString();
    }
    return "";
  }

}

export default Utils;
