
export const AUTH_KEY = 'voltcharge_user';

export function saveUser(userData) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
  } catch {
    return null;
  }
}

export function clearSession() {
 
  localStorage.removeItem('voltcharge_session');
}

export function setSession(email) {
  localStorage.setItem('voltcharge_session', email);
}

export function getSession() {
  return localStorage.getItem('voltcharge_session');
}
