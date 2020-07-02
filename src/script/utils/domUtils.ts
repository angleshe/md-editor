/**
 * @description 查找符合条件的父节点
 * @author angle
 * @date 2020-07-02
 * @export
 * @param {HTMLElement} element 当前节点
 * @param {(element: HTMLElement) => boolean} findFn 查找条件
 * @param {boolean} isSelf 是否包含当前节点
 * @returns {(HTMLElement | null)} 符合要求的节点
 */
export function findParentElement(
  element: HTMLElement,
  findFn: (element: HTMLElement) => boolean,
  isSelf: boolean = false
): HTMLElement | null {
  let target: HTMLElement | null = isSelf ? element : element.parentElement;
  while (target) {
    if (findFn(target)) {
      return target;
    }
    target = target.parentElement;
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
