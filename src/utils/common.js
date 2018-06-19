// 格式化时间格式 YYYY-MM-DD
export function formatDate (dateString) {
  let date = new Date(dateString)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return year + '-' + month + '-' + day
}
