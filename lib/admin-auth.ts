/** Clé UI locale (ne contient PAS le PIN — la vraie session est le cookie httpOnly). */
export const ADMIN_AUTH_KEY = "admin-auth";
export const PIN_LENGTH = 6;

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ADMIN_AUTH_KEY) === "true";
}
