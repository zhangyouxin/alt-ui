// export const tzToDate = (date) => {
//   date = new Date(date)
//   return (
//     date.getFullYear() +
//     '/' +
//     ('0' + (date.getMonth() + 1)).slice(-2) +
//     '/' +
//     ('0' + date.getDate()).slice(-2) +
//     ' ' +
//     date.getHours() +
//     ':' +
//     ('0' + date.getMinutes()).slice(-2) +
//     ':' +
//     ('0' + date.getSeconds()).slice(-2)
//   )
// }
const { utcToZonedTime, format } = require('date-fns-tz')

export const tzToDate = (dateStr) => {
  const date = new Date(dateStr)
  const timeZone = 'Asia/Shanghai'
  const zonedDate = utcToZonedTime(date, timeZone)
  const pattern = 'yyyy/MM/dd HH:mm:ss'
  const output = format(zonedDate, pattern)
  return output
}
