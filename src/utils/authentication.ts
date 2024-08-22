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
export function setToken(token: string) {
  Cookies.set(TOKEYKEY, token);
}
//本地获取用户信息
export function getUserInfo() {
  return localStorage.getItem(USERINFOKEY);
}
/**
 * @description 设置用户信息
 * @param user
 */
export function setUserInfo(user: object) {
  localStorage.setItem(USERINFOKEY, JSON.stringify(user));
}
