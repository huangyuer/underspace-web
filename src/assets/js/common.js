/**
 * 公共方法js
 */
// 错误处理
export function errorHandle (error) {
  if (error.response) {
    // 捕获非2xx异常
    alert('Error:获取请求失败！')
  } else {
    // 网络错误触发
    alert('Error:' + error.message)
  }
}
