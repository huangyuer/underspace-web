/**
 * Created by tolerious on 2016/12/1.
 */

export function updateCookie (name, value, days) {
  let exp = new Date()
  exp.setDate(exp.getDate() + days)
  document.cookie = name + '=' + encodeURI(value) + ';expires=' + exp.toUTCString()
}

export function setCookie (key, value) {
  document.cookie = key + '=' + value
}

export function getCookie (name) {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let arr = document.cookie.match(reg)
  if (arr) {
    return (decodeURI(arr[2]))
  } else {
    return null
  }
}

export function deleteCookie (name) {
  updateCookie(name, '', '-1')
}

export function checkLoginCookie () {
  let token = getCookie('sessionToken')
  if (token === '-1' || !token || token === 'undefined' || token === 'null' || token === null) {
    return false
  } else {
    return true
  }
}
