export function setLocalStorage(name, content) {
  localStorage.setItem(name, JSON.stringify(content));
}

export function getLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name));
}

export function removeLocalStorage(name) {
  localStorage.removeItem(name);
}
