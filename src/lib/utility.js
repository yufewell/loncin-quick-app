// 是否是数组
function isEmptyArray(obj) {
  return Array.isArray(obj) && !!obj.length
}

export default {
  isEmptyArray
}
