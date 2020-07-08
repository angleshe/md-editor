import { IEditor } from '../../index';
import { getClosestByAttribute, getClosestByClassName } from './closestBlock';
import { isTouchCtrlKey } from './utils';

/**
 * @description 修复code语言
 * @author angle
 * @date 2020-07-07
 * @export
 * @param {IEditor} editor
 * @param {KeyboardEvent} event
 * @param {Range} range
 * @returns {boolean}
 */
export function fixCodeLanguage(editor: IEditor, event: KeyboardEvent, range: Range): boolean {
  const preBeforeElement = getClosestByAttribute(
    range.startContainer,
    'data-type',
    'code-block-info'
  );
  if (preBeforeElement) {
    // 光标在code语言栏
    // 换行
    if (event.key === 'Enter' || event.key === 'Tab') {
      range.selectNodeContents(preBeforeElement.nextElementSibling!.firstChild!);
      range.collapse(false);
      event.preventDefault();
      return true;
    }
  }
  return false;
}

export function fixCodeBlock(editor: IEditor, event: KeyboardEvent, range: Range): boolean {
  const codeRenderElement = getClosestByClassName(range.startContainer, 'vditor-ir__marker--pre');
  if (codeRenderElement) {
    if (!isTouchCtrlKey(event) && !event.ctrlKey && event.key === 'Enter') {
      if (!codeRenderElement.firstElementChild?.textContent?.endsWith('\n')) {
        codeRenderElement.firstElementChild?.insertAdjacentText('beforeend', '\n');
      }
      range.insertNode(document.createTextNode('\n'));
      range.collapse(false);
      event.preventDefault();
      return true;
    }
  }
  return false;
}
