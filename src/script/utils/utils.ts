/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @description 判断参数类型
 * @author angle
 * @date 2020-06-26
 * @param {*} param 判断的参数
 * @param {string} type 类型名
 * @returns {boolean} 是否是指定类型的参数
 * @example
 *   isType(value, 'String')
 */
function isType(param: any, type: string): boolean {
  return Object.prototype.toString.call(param) === `[object ${type}]`;
}

/**
 * @description 判断是否为string类型
 * @author angle
 * @date 2020-06-26
 * @export
 * @param {*} value 判断值
 * @returns {value is string} 是否为string
 * @example
 *  isString('asd');
 */
export function isString(value: any): value is string {
  return isType(value, 'String');
}

/**
 * @description 判断是否为boolean类型
 * @author angle
 * @date 2020-07-07
 * @export
 * @param {*} value
 * @returns {value is boolean}
 * @example
 *  isBoolean(true);
 */
export function isBoolean(value: any): value is boolean {
  return isType(value, 'Boolean');
}

/**
 * @description 判断是否为array类型
 * @author angle
 * @date 2020-07-24
 * @export
 * @template T array item类型(没有判断)
 * @param {*} value
 * @returns {value is Array<T>}
 */
export function isArray<T = any>(value: any): value is Array<T> {
  return isType(value, 'Array');
}
/**
 * @description 为大小添加单位
 * @author angle
 * @date 2020-06-26
 * @export
 * @param {(number | string)} value 数值
 * @param {string} [unit='px']  添加的单位
 * @returns {string}
 */
export function addSizeUnit(value: number | string, unit: string = 'px'): string {
  return isString(value) ? value : value + unit;
}
