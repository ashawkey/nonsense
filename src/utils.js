function convertTime(timestamp) {
  var date = new Date(timestamp * 1000);
  var Y = date.getFullYear();
  var M = date.getMonth()+1;
  var D = date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  return Y+'-'+M+'-'+D+' '+(h<=9? '0'+h : h)+':'+(m<=9? '0'+m : m);
}

function padNumber(num, size) {
  var s = "000000000" + num.toString();
  return s.substr(s.length-size);
}

export {convertTime, padNumber};