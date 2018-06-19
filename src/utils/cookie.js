/**
 * Created by tolerious on 2016/12/1.
 */

function updateCookie (name, value, time) {
  let strsec = getsec(time);
  let exp = new Date();
  exp.setTime(exp.getTime() + strsec * 1);
  document.cookie = name + '=' + encodeURI(value) + ';expires=' + exp.toGMTString();
}

function getsec (str) { 
  let str1 = str.substring(1, str.length) * 1;
  let str2 = str.substring(0, 1);
  if (str2 === 's') {
    return str1 * 1000;
  }
  else if (str2 === 'h') {
    return str1 * 60 * 60 * 1000;
  }
  else if (str2 === 'd') {
    return str1 * 24 * 60 * 60 * 1000;
  }
}

export function setCookie (key, value, expireDays) {
  if(! expireDays){
    expireDays = 7; // 默认cookie保存7天
  }
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + expireDays);
  document.cookie = key + '=' + encodeURI(value) + ((expireDays==null) ? '' : ';expires=' + exdate.toGMTString());
}

export function getCookie(name){
  if (document.cookie.length>0)
  {
  let cStart=document.cookie.indexOf(name + '=');
  if (cStart !== -1)
    { 
    cStart=cStart + name.length + 1;
    let cEnd=document.cookie.indexOf(';', cStart);
    if (cEnd === -1){
      cEnd = document.cookie.length;
    } 
    return decodeURI(document.cookie.substring(cStart,cEnd));
    } 
  }
  return '';
}

export function deleteCookie (name) {
  updateCookie(name, '', '-1');
}

export function checkLoginCookie () {
  let token = getCookie('sessionToken');
  if (token === '-1' || !token || token === 'undefined' || token === 'null' || token === null) {
    return false;
  } else {
    return true;
  }
}