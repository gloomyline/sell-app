/**
 * Created by Alan on 2017/6/4.
 */

/**
 * 解析 url 参数
 * @example ?id=123&a=b
 * @return Object {id: 123, a: b}
 */
export function urlParse() {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  //['?id=123', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let _arr = item.substring(1).split('=')
      let key = decodeURIComponent(_arr[0])
      let val = decodeURIComponent(_arr[1])
      obj[key] = val
    })
  }
  return obj
}
