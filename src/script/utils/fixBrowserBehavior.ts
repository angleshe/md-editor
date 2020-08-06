import { IEditor } from '../../index';
import {
  getClosestByAttribute,
  getClosestByClassName,
  getClosestElement,
  getClosestBlock
} from './closestBlock';
import { input } from '../ir/input';
import { isOnlyTouchEnter, matchHotKey } from './eventUtils';
import { insertRow, insertCol, findTableCellsElement, setColAlign } from './tableUtils';
import { setRangeByWbr, setRangeByElement } from './selection';
import { getIndexByParents } from './domUtils';

function isTableElement(element: HTMLElement): element is HTMLTableElement {
  return element.tagName.toLocaleLowerCase() === 'table';
}

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
    if (isTableElement(tableElement)) {
      // 向添加一行
      if (matchHotKey('⌘-Enter', event)) {
        const rangeElement = getClosestElement(range.startContainer);
        if (rangeElement) {
          insertRow(rangeElement);
        }
        setRangeByWbr(tableElement, range);
        event.preventDefault();
        return true;
      }
      // 向右添加一列
      if (matchHotKey('⌘-⇧-Enter', event)) {
        const rangeElement = getClosestElement(range.startContainer);
        if (rangeElement) {
          insertCol(rangeElement, 'after');
        }
        event.preventDefault();
        return true;
      }
      // 居左
      if (matchHotKey('⌘-←', event)) {
        const rangeElement = getClosestElement(range.startContainer);
        if (rangeElement) {
          setColAlign(rangeElement, 'left');
        }
        event.preventDefault();
        return true;
      }
      // 居右
      if (matchHotKey('⌘-→', event)) {
        const rangeElement = getClosestElement(range.startContainer);
        if (rangeElement) {
          setColAlign(rangeElement, 'right');
        }
        event.preventDefault();
        return true;
      }
      // 上/下方向键切换光标
      if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
        const rangeElement = getClosestElement(range.startContainer);
        if (rangeElement) {
          const cellElement = findTableCellsElement(rangeElement);
          if (cellElement) {
            let targetElement: Element | null = null;
            // 当前光标在表头
            if (cellElement.tagName.toLocaleLowerCase() === 'th') {
              // 上边界
              if (event.code === 'ArrowUp') {
                targetElement = tableElement.previousElementSibling;
              }
              // 下边界 有表体
              else if (tableElement.rows.length > 1) {
                const index: number = getIndexByParents(cellElement);
                targetElement = tableElement.rows[1].children[index];
              }
              // 下边界 没有表体
              else {
                targetElement = tableElement.nextElementSibling;
              }
            }
            // 当前光标在表体
            else {
              // 上边界
              if (event.code === 'ArrowUp' && !cellElement.parentElement?.previousElementSibling) {
                const index: number = getIndexByParents(cellElement);
                const thElementArr = tableElement.querySelectorAll<'th'>('th');
                targetElement = thElementArr[index];
              }
              // 下边界
              else if (
                event.code === 'ArrowDown' &&
                !cellElement.parentElement?.nextElementSibling
              ) {
                targetElement = tableElement.nextElementSibling;
              }
              // 表体
              else {
                const targetParent: Element | null =
                  (event.code === 'ArrowUp'
                    ? cellElement.parentElement?.previousElementSibling
                    : cellElement.parentElement?.nextElementSibling) ?? null;
                if (targetParent) {
                  const index: number = getIndexByParents(cellElement);
                  targetElement = targetParent.children[index];
                }
              }
            }
            if (targetElement) {
              setRangeByElement(targetElement, 'after');
            }
            event.preventDefault();
            return true;
          }
        }
      }
    }
  }
  return false;
}
