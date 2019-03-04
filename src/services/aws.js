const getAmzDate = () => {
    let dateStr = new Date().toISOString();
    let chars = [":","-"];
    for (let i=0;i<chars.length;i++) {
      while (dateStr.indexOf(chars[i]) != -1) {
        dateStr = dateStr.replace(chars[i],"");
      }
    }
    dateStr = dateStr.split(".")[0] + "Z";
    return dateStr;
}

export default {
    getAmzDate
}