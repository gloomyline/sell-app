/**
 * Created by Alan on 2017/6/4.
 */

let localStorage = window.localStorage

/**
 * 存储数据至 localStorage
 * @param id 记录 Id
 * @param key 记录数据键
 * @param value 记录数据值
 */
export function saveToLocal(id, key, value) {
  let seller = localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
  }
  else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  localStorage.__seller__ = JSON.stringify(seller)
}

/**
 * 从 localStorage 中读取指定 Id 记录
 * @param id 记录 Id
 * @param key 记录数据键
 * @param def 若指定键没有数据返回的默认值
 */
export function loadFromLocal(id, key, def) {
  let seller = JSON.parse(localStorage.__seller__)
  if (!seller) return def
  else {
    if (!seller[id]) return def
    else {
      return seller[id][key]
    }
  }
}

