/**
 * 工具函数
 * @description 工具函数
 */
import { cloneDeep } from "lodash";

/**
 * 深拷贝对象或数组
 * @param value 需要拷贝的值
 * @returns 深拷贝后的新值
 */
export function deepClone<T>(value: T): T {
  return cloneDeep(value);
}
