/**
 * @description 封装token和用户信息
 */

import Cookies from "js-cookie";

export const TOKEYKEY = "token";
export const USERINFOKEY = "userInfo";
/**
 * @description 获取token
 * @returns token
 */
export function getToken() {
  return Cookies.get(TOKEYKEY);
}
/**
 * @description 设置token
 * @param token
 */
export function setToken(accessToken: string, expires: number) {
  Cookies.set(TOKEYKEY, accessToken, { expires: (expires - Date.now()) / 36400000 });
}
/**
 * @description 移除掉token
 * @param token
 */
export function removeToken() {
  Cookies.remove(TOKEYKEY);
  //移除用户信息
  localStorage.removeItem(USERINFOKEY);
}

//本地获取用户信息
export function getUserInfo() {
  const userInfo = localStorage.getItem(USERINFOKEY);
  return userInfo ? JSON.parse(userInfo) : null;
}
/**
 * @description 设置用户信息
 * @param user
 */
export function setUserInfo(user: object) {
  localStorage.setItem(USERINFOKEY, JSON.stringify(user));
}
