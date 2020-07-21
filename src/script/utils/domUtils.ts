import { isBoolean } from './utils';

/**
 * @description 查找符合条件的父节点
 * @author angle
 * @date 2020-07-21
 * @export
 * @template T 返回节点类型
 * @param {(HTMLElement | null)} element 当前节点
 * @param {(element: HTMLElement) => boolean} findFn 查找条件
 * @returns {(T | null)} 符合要求的节点
 */
export function findParentElement<T extends HTMLElement = HTMLElement>(
  element: HTMLElement | null,
  findFn: (element: HTMLElement) => boolean
): T | null;

/**
 * @description 查找符合条件的父节点
 * @author angle
 * @date 2020-07-21
 * @export
 * @template T 返回节点类型
 * @param {(HTMLElement | null)} element 当前节点
 * @param {(element: HTMLElement) => boolean} findFn 查找条件
 * @param {(element: HTMLElement) => boolean} isEndFn 结束条件
 * @returns {(T | null)} 符合要求的节点
 */
export function findParentElement<T extends HTMLElement = HTMLElement>(
  element: HTMLElement | null,
  findFn: (element: HTMLElement) => boolean,
  isEndFn: (element: HTMLElement) => boolean
): T | null;

/**
 * @description 查找符合条件的父节点
 * @author angle
 * @date 2020-07-21
 * @export
 * @template T 返回节点类型
 * @param {(HTMLElement | null)} element 当前节点
 * @param {(element: HTMLElement) => boolean} findFn 查找条件
 * @param {boolean} isSelf 是否包含当前节点
 * @returns {(T | null)} 符合要求的节点
 */
export function findParentElement<T extends HTMLElement = HTMLElement>(
  element: HTMLElement | null,
  findFn: (element: HTMLElement) => boolean,
  isSelf: boolean
): T | null;

/**
 * @description 查找符合条件的父节点
 * @author angle
 * @date 2020-07-21
 * @export
 * @template T 返回节点类型
 * @param {(HTMLElement | null)} element 当前节点
 * @param {(element: HTMLElement) => boolean} findFn 查找条件
 * @param {(element: HTMLElement) => boolean} isEndFn 结束条件
 * @param {boolean} isSelf 是否包含当前节点
 * @returns {(T | null)} 符合要求的节点
 */
export function findParentElement<T extends HTMLElement = HTMLElement>(
  element: HTMLElement | null,
  findFn: (element: HTMLElement) => boolean,
  isEndFn: (element: HTMLElement) => boolean,
  isSelf: boolean
): T | null;

export function findParentElement<T extends HTMLElement = HTMLElement>(
  element: HTMLElement | null,
  findFn: (element: HTMLElement) => boolean,
  ...arg: (((element: HTMLElement) => boolean) | boolean | undefined)[]
): T | null {
  let isEndFn: ((element: HTMLElement) => boolean) | null = null;
  let isSelf: boolean = false;
  if (arg.length === 0) {
    isEndFn = null;
    isSelf = false;
  } else if (arg.length === 1) {
    if (isBoolean(arg[0])) {
      isEndFn = null;
      isSelf = arg[0];
    } else {
      isEndFn = arg[0]!;
      isSelf = false;
    }
  } else {
    isEndFn = arg[0] as (element: HTMLElement) => boolean;
    isSelf = arg[1] as boolean;
  }
  if (element) {
    let target: HTMLElement | null = isSelf ? element : element.parentElement;
    while (target && !(isEndFn && isEndFn(target))) {
      if (findFn(target)) {
        return target as T;
      }
      target = target.parentElement;
    }
  }
  return null;
}
/**
 * @description 替换节点
 * @author angle
 * @date 2020-07-02
 * @export
 * @param {HTMLElement} oldElement 老节点
 * @param {HTMLElement} newElement 新节点
 */
export function replaceElement(oldElement: HTMLElement, newElement: HTMLElement): void {
  if (oldElement.parentElement) {
    oldElement.parentElement.replaceChild(newElement, oldElement);
  }
}

/**
 * @description 判断element是否存在某个class
 * @author angle
 * @date 2020-07-07
 * @export
 * @param {HTMLElement} element
 * @param {string} className
 * @returns {boolean}
 */
export function hasClass(element: HTMLElement, className: string): boolean {
  return ` ${element.className}`.includes(` ${className}`);
}

/**
 * @description 是否mac系统
 * @author angle
 * @date 2020-07-07
 * @export
 * @returns {boolean}
 */
export function isMacSystem(): boolean {
  return navigator.platform.toUpperCase().includes('MAC');
}

/**
 * @description 获取dom在父本的索引值
 * @author angle
 * @date 2020-07-21
 * @export
 * @param {HTMLElement} element
 * @returns {number}
 */
export function getIndexByParents(element: HTMLElement): number {
  const parentElement = element.parentElement;
  if (parentElement) {
    for (let i: number = 0; i < parentElement.childElementCount; i++) {
      if (parentElement.children[i].isEqualNode(element)) {
        return i;
      }
    }
  }
  return -1;
}
