
// 获取当前时间，计算是早上、上午、下午、晚上
export const getTime = () => {
  let message = ''
  const hours = new Date().getHours()
  if (hours < 6) {
    message = '凌晨好'; // 0:00 - 5:59
  } else if (hours < 12) {
    message = '早上好'; // 6:00 - 11:59
  } else if (hours < 18) {
    message = '下午好'; // 12:00 - 17:59
  } else {
    message = '晚上好'; // 18:00 - 23:59
  }
  console.log(`${message}，现在是 ${hours} 点`);
  return message
}