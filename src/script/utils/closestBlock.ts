import { findParentElement, hasClass } from './domUtils';
import style from 'style/editor.modules.scss';

// 块级标签集合
const blockTagArray: string[] = [
  'header',
  'section',
  'footer',
  'div',
  'ul',
  'ol',
  'li',
  'form',
  'dl',
  'dt',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'table'
];

/**
 * @description 获取node最近的element
 * @author angle
 * @date 2020-07-07
 * @export
 * @param {Node} node
 * @returns {(HTMLElement | null)}
 */
export function getClosestElement(node: Node): HTMLElement | null {
  if (node.nodeType === Node.ELEMENT_NODE) {
    return node as HTMLElement;
  } else if (node.nodeType === Node.TEXT_NODE) {
    return node.parentElement;
  }
  return null;
}

/**
 * @description 获取最近的块级节点
 * @author angle
 * @date 2020-07-02
 * @export
 * @param {Node} node
 * @returns {(HTMLElement | null)}
 */
export function getClosestBlock(node: Node): HTMLElement | null {
  return findParentElement(
    getClosestElement(node),
    (ele: HTMLElement): boolean =>
      blockTagArray.includes(ele.tagName.toLocaleLowerCase()) || hasClass(ele, style.content),
    true
  );
}

/**
 * @description 获取匹配属性值的节点
 * @author angle
 * @date 2020-07-07
 * @export
 * @param {Node} node
 * @param {string} attr 属性名
 * @param {string} value 属性值
 * @returns {(HTMLElement | null)}
 */
export function getClosestByAttribute(node: Node, attr: string, value: string): HTMLElement | null {
  return findParentElement(
    getClosestElement(node),
    (dom: HTMLElement): boolean => dom.getAttribute(attr) === value,
    true
  );
}

/**
 * @description 获取匹配class的element
 * @author angle
 * @date 2020-07-07
 * @export
 * @param {Node} node
 * @param {string} className
 * @returns {(HTMLElement | null)}
 */
export function getClosestByClassName(node: Node, className: string): HTMLElement | null {
  return findParentElement(getClosestElement(node), (ele: HTMLElement): boolean =>
    hasClass(ele, className)
  );
}
