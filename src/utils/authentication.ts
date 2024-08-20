import Cookies from "js-cookie";

const tokenKey = "token";
const userInfoKey = "userInfo";
/**
 * @description 获取token
 * @returns token
 */
export function getToken() {
  return Cookies.get(tokenKey);
}
/**
 * @description 设置token
 * @param token
 */
export function setToken(token: string) {
  Cookies.set(tokenKey, token);
}
//本地获取用户信息
export function getUserInfo() {
  return localStorage.getItem(userInfoKey);
}
/**
 * @description 设置用户信息
 * @param user
 */
export function setUserInfo(user: object) {
  localStorage.setItem(userInfoKey, JSON.stringify(user));
}
