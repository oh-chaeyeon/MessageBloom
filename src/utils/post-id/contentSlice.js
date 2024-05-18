export default function contentSlice(value) {
  if (value.length <= 75) {
    return value;
  } else {
    const slicedValue = `${value.slice(0, 75)}...`;
    return slicedValue;
  }
}
