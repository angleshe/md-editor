import { findParentElement, getIndexByParents } from './domUtils';

/**
 * @description 寻找父本表格单元格节点
 * @author angle
 * @date 2020-07-21
 * @export
 * @param {HTMLElement} element
 * @returns {(HTMLTableCellElement | null)}
 */
export function findTableCellsElement(element: HTMLElement): HTMLTableCellElement | null {
  return findParentElement(
    element,
    (ele) => ['th', 'td'].includes(ele.tagName.toLocaleLowerCase()),
    true
  );
}

/**
 * @description 寻找父本表格节点
 * @author angle
 * @date 2020-07-21
 * @export
 * @param {HTMLElement} element
 * @returns {(HTMLTableElement | null)}
 */
export function findTableElement(element: HTMLElement): HTMLTableElement | null {
  return findParentElement<HTMLTableElement>(
    element,
    (ele) => ele.tagName.toLocaleLowerCase() === 'table'
  );
}

/**
 * @description 插入行
 * @author angle
 * @date 2020-07-14
 * @export
 * @param {HTMLElement} targetElement 目标element
 * @param {('before' | 'after')} [position='after'] 方位 before: 上方 after: 下方
 * @param {number} [count=1] 插入行数
 */
export function insertRow(
  targetElement: HTMLElement,
  position: 'before' | 'after' = 'after',
  count: number = 1
): void {
  const cellsElement = findTableCellsElement(targetElement);
  if (cellsElement) {
    const isHead: boolean = cellsElement.tagName.toLocaleLowerCase() === 'th';
    const tableElement: HTMLTableElement = findTableElement(cellsElement)!;
    if (isHead && position === 'before') {
      throw new Error('表头不得向上添加行!');
    }

    const rowsHtml: string = Array<string>(count)
      .fill('')
      .reduce(
        (prev, curr, row) =>
          prev +
          `<tr>${Array<string>(tableElement.rows[0].childElementCount)
            .fill('')
            .reduce(
              (prev, curr, index) => prev + `<td>${row === 0 && index === 0 ? '<wbr>' : ''}</td>`,
              ''
            )}</tr>`,
        ''
      );
    if (isHead) {
      const tbodyElement = tableElement.querySelector<HTMLTableSectionElement>('tbody');
      if (tbodyElement) {
        tbodyElement.insertAdjacentHTML('afterbegin', rowsHtml);
      } else {
        tableElement.insertAdjacentHTML('beforeend', `<tbody>${rowsHtml}</tbody>`);
      }
    } else {
      cellsElement.parentElement?.insertAdjacentHTML(
        position === 'before' ? 'beforebegin' : 'afterend',
        rowsHtml
      );
    }
  }
}

/**
 * @description 添加列
 * @author angle
 * @date 2020-07-21
 * @export
 * @param {HTMLElement} targetElement 目标element
 * @param {('before' | 'after')} [position='after'] 方位 before: 左边 after: 右边
 * @param {number} [count=1] 插入列数
 */
export function insertCol(
  targetElement: HTMLElement,
  position: 'before' | 'after' = 'after',
  count: number = 1
): void {
  const cellsElement = findTableCellsElement(targetElement);
  if (cellsElement) {
    const index: number = getIndexByParents(cellsElement);
    const tableElement: HTMLTableElement = findTableElement(cellsElement)!;
    const trElementArr = tableElement.querySelectorAll<'tr'>('tr');
    for (let i: number = 0; i < trElementArr.length; i++) {
      trElementArr[i].children[index].insertAdjacentHTML(
        position === 'before' ? 'beforebegin' : 'afterend',
        Array(count)
          .fill('')
          .reduce((prev) => prev + `<${i === 0 ? 'th' : 'td'}></${i === 0 ? 'th' : 'td'}>`, '')
      );
    }
  }
}

/**
 * @description 删除行
 * @author angle
 * @date 2020-07-29
 * @export
 * @param {HTMLElement} targetElement
 */
export function deleteRow(targetElement: HTMLElement): void {
  const trElement = findParentElement<HTMLTableRowElement>(
    targetElement,
    (ele) => ele.tagName.toLocaleLowerCase() === 'tr',
    true
  );
  if (trElement) {
    trElement.remove();
  }
}

/**
 * @description 删除列
 * @author angle
 * @date 2020-07-29
 * @export
 * @param {HTMLElement} targetElement
 */
export function deleteCol(targetElement: HTMLElement): void {
  const cellElement = findTableCellsElement(targetElement);
  const tableElement = findTableElement(targetElement);
  if (cellElement && tableElement) {
    const index: number = getIndexByParents(cellElement);
    for (let i: number = 0; i < tableElement.rows.length; i++) {
      tableElement.rows[i].children[index].remove();
    }
  }
}

/**
 * @description 删除表格
 * @author angle
 * @date 2020-07-29
 * @export
 * @param {HTMLElement} targetElement
 */
export function deleteTable(targetElement: HTMLElement): void {
  findTableElement(targetElement)?.remove();
}
