/**
 * @description
 * @author angle
 * @date 2020-07-01
 * @export
 * @param {Range} range
 */
export function setSelectionFocus(range: Range): void {
  const selection = getSelection();
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
/**
 * @description 光标到wbr并删除wbr
 * @author angle
 * @date 2020-07-01
 * @export
 * @param {HTMLElement} element
 * @param {Range} range
 */
export function setRangeByWbr(element: HTMLElement, range: Range): void {
  const wbrElement = element.querySelector<'wbr'>('wbr');
  if (wbrElement) {
    if (wbrElement.previousSibling) {
      if (wbrElement.previousSibling.nodeType === Node.TEXT_NODE) {
        // text<wbr>
        range.setStart(
          wbrElement.previousSibling,
          wbrElement.previousSibling.textContent?.length ?? 0
        );
      } else if (wbrElement.previousSibling.nodeType === Node.ELEMENT_NODE) {
        // <span>text</span><wbr>
        range.setStartBefore(wbrElement);
      }
    } else if (wbrElement.nextSibling) {
      // <wbr>text
      range.setStart(wbrElement.nextSibling, 0);
    } else {
      if (wbrElement.parentElement) {
        // <p><wbr></p>
        range.setStart(wbrElement.parentElement, 0);
      }
    }
    wbrElement.remove();
    setSelectionFocus(range);
  }
}

/**
 * @description 设置光标进element里面
 * @author angle
 * @date 2020-07-22
 * @export
 * @param {Element} element
 * @param {('before' | 'after')} [position='before'] 光标的位置: before: 在element内容的开头 after: 在element内容的结尾
 */
export function setRangeByElement(element: Element, position: 'before' | 'after' = 'before'): void {
  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(position === 'before');
  setSelectionFocus(range);
}

/**
 * @description 获取range
 * @author angle
 * @date 2020-07-29
 * @export
 * @returns {(Range | null)}
 */
export function getRange(): Range | null {
  const selection = getSelection();
  if (selection) {
    return selection.getRangeAt(0);
  }
  return null;
}
