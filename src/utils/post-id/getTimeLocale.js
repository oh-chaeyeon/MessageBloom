export default function (time) {
  const getTime = new Date(time);
  const year = getTime.getFullYear();
  const month = getTime.getMonth() + 1;
  const date = getTime.getDate();

  return `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`;
}
