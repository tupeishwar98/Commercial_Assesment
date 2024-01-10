export function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null; // Cookie not found
}

export function setCookie(name, value) {
  const cookie = `${name}=${value}`;
  document.cookie = cookie;
}

export function deleteCookie(name) {
  document.cookie = `${name}=;`;
}
