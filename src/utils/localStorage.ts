/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = (path: string): boolean => reg.test(path);

export { isUrl };


export function setOrgDetails(orgID: string) {
  return localStorage.setItem('organisation', orgID);
}

export function getOrgDetails() {
  return localStorage.getItem('organisation');
}

export function setUserDetails(userID: string) {
  return localStorage.setItem('user', userID);
}

export function getUserDetails() {
  return localStorage.getItem('user');
}

export function setToken(token: string) {
  return localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}