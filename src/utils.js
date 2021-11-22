function convertTime(timestamp) {
  var date = new Date(timestamp * 1000);
  var Y = date.getFullYear();
  var M = date.getMonth()+1;
  var D = date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  return Y+'-'+M+'-'+D+' '+(h<=9? '0'+h : h)+':'+(m<=9? '0'+m : m);
  //return Y+'-'+M+'-'+D;
}

function padNumber(num, length) {
  var s = "000000000" + num.toString();
  return s.substr(s.length - length);
}

function truncateString(str, length) {
  if (str.length > length) {
    return str.substring(0, length) + "......";
  }
  else {
    return str;
  }
}

function getToken() {
  return localStorage['nonsense_token'] || 'nonsense';
}

function isStringValid(s) {
  return /^[0-9a-zA-Z_.-]+$/.test(s);
}

export {convertTime, padNumber, truncateString, getToken, isStringValid};