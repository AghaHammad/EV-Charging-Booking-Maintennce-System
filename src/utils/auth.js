// Shared auth utilities — user credentials stored in localStorage
// So one user can sign up and then sign in from any page

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
  // Only clear the session flag, not the registered user
  localStorage.removeItem('voltcharge_session');
}

export function setSession(email) {
  localStorage.setItem('voltcharge_session', email);
}

export function getSession() {
  return localStorage.getItem('voltcharge_session');
}
