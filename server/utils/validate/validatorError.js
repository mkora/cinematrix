export default function (text) {
  const error = new Error(text);
  error.status = 400;
  return error;
}
