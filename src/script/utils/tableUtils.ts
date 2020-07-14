import { findParentElement } from './domUtils';

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
  const cellsElement = findParentElement(
    targetElement,
    (dom) => ['th', 'td'].includes(dom.tagName.toLocaleLowerCase()),
    true
  );
  if (cellsElement) {
    const isHead: boolean = cellsElement.tagName.toLocaleLowerCase() === 'th';
    const tableElement: HTMLTableElement = findParentElement(
      targetElement,
      (dom) => dom.tagName.toLocaleLowerCase() === 'table'
    ) as HTMLTableElement;
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
