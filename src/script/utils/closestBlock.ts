import { findParentElement } from './domUtils';

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
  'code',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'pre'
];

/**
 * @description 获取最近的块级节点
 * @author angle
 * @date 2020-07-02
 * @export
 * @param {Node} node
 * @returns {(HTMLElement | null)}
 */
export function getClosestBlock(node: Node): HTMLElement | null {
  let element: HTMLElement | null = null;
  if (node.nodeType === Node.TEXT_NODE) {
    element = node.parentElement;
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    element = node as HTMLElement;
  }
  return element
    ? findParentElement(
        element,
        (ele: HTMLElement): boolean => blockTagArray.includes(ele.tagName.toLocaleLowerCase()),
        true
      )
    : null;
}
