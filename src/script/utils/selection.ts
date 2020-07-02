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
