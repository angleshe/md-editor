import { IEditor } from '@/index';
import { findTableElement, findTableCellsElement } from '../utils/tableUtils';
import TableMenu from '../ui/modal/TableMenu';
import { setRangeByElement } from '../utils/selection';
/**
 * @description 鼠标右键点击
 * @author angle
 * @date 2020-07-24
 * @param {IEditor} editor
 * @param {MouseEvent} event
 */
function rightMousedown(editor: IEditor, event: MouseEvent): void {
  if (event.target instanceof HTMLElement) {
    // 表格右键菜单
    const tableMenu: TableMenu = TableMenu.getTableMenu(editor);
    if (findTableElement(event.target)) {
      const cellElement = findTableCellsElement(event.target);
      if (cellElement) {
        // 设置光标
        setRangeByElement(cellElement, 'after');
        tableMenu.show({
          left: event.clientX,
          top: event.clientY
        });
      }
      event.preventDefault();
      event.stopPropagation();
    }
  }
}

/**
 * @description 鼠标点击事件处理
 * @author angle
 * @date 2020-07-24
 * @export
 * @param {IEditor} editor
 * @param {MouseEvent} event
 */
export function processMousedown(editor: IEditor, event: MouseEvent): void {
  if (event.button === 2) {
    rightMousedown(editor, event);
  }
}
