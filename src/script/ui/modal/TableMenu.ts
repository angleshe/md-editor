import ModalBase from './ModalBase';
import style from 'style/modal.modules.scss';
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

  private constructor() {
    super({
      maskClassName: style.tableMenuMask
    });
  }

  protected contentRender(): string {
    return 'hello modal';
  }
}

export default TableMenu;
