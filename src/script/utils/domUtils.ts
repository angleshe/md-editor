import { isBoolean } from './utils';

/**
 * @description 查找符合条件的父节点
 * @author angle
 * @date 2020-07-07
 * @export
 * @param {(HTMLElement | null)} element 当前节点
 * @param {(element: HTMLElement) => boolean} findFn 查找条件
 * @returns {(HTMLElement | null)} 符合要求的节点
 */
export function findParentElement(
  element: HTMLElement | null,
  findFn: (element: HTMLElement) => boolean
): HTMLElement | null;
/**
 * @description 查找符合条件的父节点
 * @author angle
 * @date 2020-07-07
 * @export
 * @param {(HTMLElement | null)} element 当前节点
 * @param {(element: HTMLElement) => boolean} findFn 查找条件
 * @param {(element: HTMLElement) => boolean} isEndFn 结束条件
 * @returns {(HTMLElement | null)} 符合要求的节点
 */
export function findParentElement(
  element: HTMLElement | null,
  findFn: (element: HTMLElement) => boolean,
  isEndFn: (element: HTMLElement) => boolean
): HTMLElement | null;
/**
 * @description 查找符合条件的父节点
 * @author angle
 * @date 2020-07-07
 * @export
 * @param {(HTMLElement | null)} element 当前节点
 * @param {(element: HTMLElement) => boolean} findFn 查找条件
 * @param {boolean} isSelf 是否包含当前节点
 * @returns {(HTMLElement | null)}
 */
export function findParentElement(
  element: HTMLElement | null,
  findFn: (element: HTMLElement) => boolean,
  isSelf: boolean
): HTMLElement | null;
/**
 * @description 查找符合条件的父节点
 * @author angle
 * @date 2020-07-07
 * @export
 * @param {(HTMLElement | null)} element 当前节点
 * @param {(element: HTMLElement) => boolean} findFn 查找条件
 * @param {(element: HTMLElement) => boolean} isEndFn 结束条件
 * @param {boolean} isSelf 是否包含当前节点
 * @returns {(HTMLElement | null)}
 */
export function findParentElement(
  element: HTMLElement | null,
  findFn: (element: HTMLElement) => boolean,
  isEndFn: (element: HTMLElement) => boolean,
  isSelf: boolean
): HTMLElement | null;

export function findParentElement(
  element: HTMLElement | null,
  findFn: (element: HTMLElement) => boolean,
  ...arg: (((element: HTMLElement) => boolean) | boolean | undefined)[]
): HTMLElement | null {
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
        return target;
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
 * @description 是否按下windows/ctrl mac/meta键
 * @author angle
 * @date 2020-07-07
 * @export
 * @param {KeyboardEvent} event
 * @returns {boolean}
 */
export function isTouchCtrlKey(event: KeyboardEvent): boolean {
  return isMacSystem() ? event.metaKey && !event.ctrlKey : !event.metaKey && event.ctrlKey;
}

/**
 * @description 是否只按下回车
 * @author angle
 * @date 2020-07-08
 * @export
 * @param {KeyboardEvent} event
 * @returns {boolean}
 */
export function isOnlyTouchEnter(event: KeyboardEvent): boolean {
  return !isTouchCtrlKey(event) && !event.altKey && !event.shiftKey && event.key === 'Enter';
}
