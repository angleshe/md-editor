import ModalBase, { IMenuItem } from './ModalBase';
import style from 'style/modal.modules.scss';
import { getRange } from '@/script/utils/selection';
import {
  findTableCellsElement,
  insertCol,
  insertRow,
  findTableElement,
  deleteCol,
  deleteRow,
  deleteTable,
  setColAlign
} from '@/script/utils/tableUtils';
import { getClosestElement } from '@/script/utils/closestBlock';

/**
 * @description 表格操作事件
 * @enum {number}
 */
enum TableEvent {
  /**
   * 上方增加行
   */
  EVENT_ADD_ROW_ABOVE = 'EVENT_ADD_ROW_ABOVE',
  /**
   * 下方增加行
   */
  EVENT_ADD_ROW_BELOW = 'EVENT_ADD_ROW_BELOW',
  /**
   * 左侧增加列
   */
  EVENT_ADD_COL_BEFORE = 'EVENT_ADD_COL_BEFORE',
  /**
   * 右侧增加列
   */
  EVENT_ADD_COL_AFTER = 'EVENT_ADD_COL_AFTER',
  /**
   * 对齐组
   */
  EVENT_ALIGN_GROUP = 'EVENT_ALIGN_GROUP',
  /**
   * 左对齐
   */
  EVENT_ALIGN_LEFT = 'EVENT_ALIGN_LEFT',
  /**
   * 剧中
   */
  EVENT_ALIGN_CENTER = 'EVENT_ALIGN_CENTER',
  /**
   * 右对齐
   */
  EVENT_ALIGN_RIGHT = 'EVENT_ALIGN_RIGHT',
  /**
   * 删除行
   */
  EVENT_DELETE_ROW = 'EVENT_DELETE_ROW',
  /**
   * 删除列
   */
  EVENT_DELETE_COL = 'EVENT_DELETE_COL',
  /**
   * 删除表格
   */
  EVENT_DELETE_TABLE = 'EVENT_DELETE_TABLE',
  /**
   * 复制html
   */
  EVENT_COPY_HTML = 'EVENT_COPY_HTML',
  /**
   * 复制md
   */
  EVENT_COPY_MD = ' EVENT_COPY_MD'
}
/**
 * @description 表格菜单
 * @author angle
 * @date 2020-07-24
 * @class TableMenu
 * @extends {ModalBase}
 */
class TableMenu extends ModalBase {
  /**
   * @description 单例节点
   * @private
   * @static
   * @type {(TableMenu | null)}
   * @memberof TableMenu
   */
  private static tableMenu: TableMenu | null = null;

  private readonly menuList: IMenuItem[] = [
    {
      text: '上方增加行',
      key: TableEvent.EVENT_ADD_ROW_ABOVE
    },
    {
      text: '下方增加行',
      subText: '⌘+Enter',
      splitLineBottom: true,
      key: TableEvent.EVENT_ADD_ROW_BELOW
    },
    {
      text: '左侧增加列',
      key: TableEvent.EVENT_ADD_COL_BEFORE
    },
    {
      text: '右侧增加列',
      subText: '⌘+⇧+Enter',
      splitLineBottom: true,
      key: TableEvent.EVENT_ADD_COL_AFTER
    },
    {
      text: '对齐方式',
      splitLineBottom: true,
      key: TableEvent.EVENT_ALIGN_GROUP,
      children: [
        {
          text: '左对齐',
          key: TableEvent.EVENT_ALIGN_LEFT,
          subText: '⌘+←'
        },
        {
          text: '居中',
          key: TableEvent.EVENT_ALIGN_CENTER
        },
        {
          text: '右对齐',
          key: TableEvent.EVENT_ALIGN_RIGHT,
          subText: '⌘+→'
        }
      ]
    },
    {
      text: '删除当前行',
      key: TableEvent.EVENT_DELETE_ROW
    },
    {
      text: '删除当前列',
      key: TableEvent.EVENT_DELETE_COL
    },
    {
      text: '删除表格',
      splitLineBottom: true,
      key: TableEvent.EVENT_DELETE_TABLE
    },
    {
      text: '复制表格',
      key: TableEvent.EVENT_COPY_HTML
    }
  ];

  /**
   * @description 获取表格菜单对象,如果没有则创建
   * @author angle
   * @date 2020-07-24
   * @static
   * @returns {TableMenu}
   * @memberof TableMenu
   */
  public static getTableMenu(): TableMenu {
    if (TableMenu.tableMenu === null) {
      TableMenu.tableMenu = new TableMenu();
    }
    return TableMenu.tableMenu;
  }

  // ts暂时不支持函数隐藏,所以暂时采用光标定位出所在的table和cell
  // public show(cellElement: HTMLTableCellElement, position: IPosition): void;
  // public show(
  //   cellElement: HTMLTableCellElement,
  //   tableElement: HTMLTableElement,
  //   position: IPosition
  // ): void;

  // public show(
  //   cellElement: HTMLTableCellElement,
  //   param: IPosition | HTMLTableElement,
  //   position?: IPosition
  // ): void {
  //   this.cellElement = cellElement;
  //   if (position) {
  //     this.tableElement = param as HTMLTableElement;
  //   } else {
  //     this.tableElement = findTableElement(this.cellElement);
  //   }
  //   super.show((position ?? param) as IPosition);
  //   console.log(this.tableElement);
  // }

  private constructor() {
    super({
      maskClassName: style.tableMenuMask
    });
  }

  protected contentRender(): HTMLUListElement {
    const ulElement: HTMLUListElement = document.createElement<'ul'>('ul');
    this.menuList.forEach((item) => ulElement.appendChild(this.createdMenuItem<'li'>(item, 'li')));
    return ulElement;
  }

  private getTableHtml(targetElement: HTMLElement): string {
    return findTableElement(targetElement)?.outerHTML ?? '';
  }

  protected menuItemClickHandler(key: TableEvent | null): void {
    const range = getRange();
    if (range) {
      const cellElement = findTableCellsElement(getClosestElement(range.startContainer)!);
      if (cellElement) {
        let isCloseMenu: boolean = true;
        switch (key) {
          case TableEvent.EVENT_ADD_COL_AFTER:
            insertCol(cellElement, 'after');
            break;
          case TableEvent.EVENT_ADD_COL_BEFORE:
            insertCol(cellElement, 'before');
            break;
          case TableEvent.EVENT_ADD_ROW_ABOVE:
            insertRow(cellElement, 'before');
            break;
          case TableEvent.EVENT_ADD_ROW_BELOW:
            insertRow(cellElement, 'after');
            break;
          case TableEvent.EVENT_ALIGN_CENTER:
            setColAlign(cellElement, 'center');
            break;
          case TableEvent.EVENT_ALIGN_LEFT:
            setColAlign(cellElement, 'left');
            break;
          case TableEvent.EVENT_ALIGN_RIGHT:
            setColAlign(cellElement, 'right');
            break;
          case TableEvent.EVENT_COPY_HTML:
            this.getTableHtml(cellElement);
            break;
          case TableEvent.EVENT_COPY_MD:
            break;
          case TableEvent.EVENT_DELETE_COL:
            deleteCol(cellElement);
            break;
          case TableEvent.EVENT_DELETE_ROW:
            deleteRow(cellElement);
            break;
          case TableEvent.EVENT_DELETE_TABLE:
            deleteTable(cellElement);
            break;
          default:
            isCloseMenu = false;
            break;
        }
        if (isCloseMenu) {
          this.hide();
        }
      }
    }
  }
}

export default TableMenu;
