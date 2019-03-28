const converter = obj => {
  const queryString = Object.keys(obj)
    .map(key => key + "=" + obj[key])
    .join("&")
  return queryString
}
export { converter }
