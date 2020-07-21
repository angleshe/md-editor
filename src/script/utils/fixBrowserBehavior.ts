import { IEditor } from '../../index';
import {
  getClosestByAttribute,
  getClosestByClassName,
  getClosestElement,
  getClosestBlock
} from './closestBlock';
import { input } from '../ir/input';
import { isOnlyTouchEnter, matchHotKey } from './eventUtils';
import { insertRow, insertCol } from './tableUtils';
import { setRangeByWbr } from './selection';

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

/**
 * @description 修复code
 * @author angle
 * @date 2020-07-08
 * @export
 * @param {IEditor} editor
 * @param {KeyboardEvent} event
 * @param {Range} range
 * @returns {boolean}
 */
export function fixCodeBlock(editor: IEditor, event: KeyboardEvent, range: Range): boolean {
  const codeRenderElement = getClosestByClassName(range.startContainer, 'vditor-ir__marker--pre');
  if (codeRenderElement) {
    if (isOnlyTouchEnter(event)) {
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

/**
 * @description 修复表格
 * @author angle
 * @date 2020-07-08
 * @export
 * @param {IEditor} editor
 * @param {KeyboardEvent} event
 * @param {Range} range
 * @returns {boolean}
 */
export function fixTable(editor: IEditor, event: KeyboardEvent, range: Range): boolean {
  const tableElement = getClosestBlock(range.startContainer);
  if (tableElement) {
    // enter自动补全
    if (isOnlyTouchEnter(event)) {
      const tableText: string = tableElement.textContent?.trim() ?? '';
      if (tableText) {
        const tableArr: string[] = tableText.split('|') ?? [];
        if (tableArr.length >= 3 && tableText.startsWith('|') && tableText.endsWith('|')) {
          tableElement.textContent = `${tableText}\n${tableArr.reduce<string>(
            (prev, curr, index) =>
              prev + (index === 0 || index === tableArr.length - 1 ? '' : ' --- |'),
            '|'
          )}\n|`;
          range.selectNodeContents(tableElement);
          range.collapse(false);
          input(editor, range);
          event.preventDefault();
          return true;
        }
      }
    }
    // table快捷键
    if (tableElement.tagName.toLocaleLowerCase() === 'table') {
      if (matchHotKey('⌘-Enter', event)) {
        const cellsElement = getClosestElement(range.startContainer);
        if (cellsElement) {
          insertRow(cellsElement);
        }
        setRangeByWbr(tableElement, range);
        event.preventDefault();
        return true;
      }
      if (matchHotKey('⌘-⇧-Enter', event)) {
        const cellsElement = getClosestElement(range.startContainer);
        if (cellsElement) {
          insertCol(cellsElement, 'after');
        }
        event.preventDefault();
        return true;
      }
    }
  }
  return false;
}
