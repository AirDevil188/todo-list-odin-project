export function setData(value, data) {
  return localStorage.setItem(value, JSON.stringify(data));
}

export function getData(value) {
  return JSON.parse(localStorage.getItem(value));
}
