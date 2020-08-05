import style from 'style/modal.modules.scss';
import { isString, addSizeUnit } from '@/script/utils/utils';
import { addClass, findParentElement } from '@/script/utils/domUtils';
import { autoBind, override } from '@/script/utils/decorators';

/**
 * @description 模态配置项
 * @author angle
 * @date 2020-07-24
 * @export
 * @interface IModalBaseOptions
 */
export interface IModalBaseOptions {
  /**
   * @description 遮罩层class
   * @type {string}
   * @memberof IModalBaseOptions
   */
  maskClassName?: string;
}
/**
 * @description 位置
 * @author angle
 * @date 2020-07-24
 * @interface IPosition
 */
export interface IPosition {
  /**
   * @description 距离window左边距离
   * @type {(number | string)}
   * @memberof IPosition
   */
  left: number | string;
  /**
   * @description 距离window上边距离
   * @type {(number | string)}
   * @memberof IPosition
   */
  top: number | string;
}

/**
 * @description 菜单项
 * @author angle
 * @date 2020-07-24
 * @export
 * @interface IMenuItem
 */
export interface IMenuItem {
  /**
   * @description 菜单文本
   * @type {string}
   * @memberof IMenuItem
   */
  text: string;
  /**
   * @description 菜单副文本(右)
   * @type {string}
   * @memberof IMenuItem
   */
  subText?: string;
  /**
   * @description 上分割线
   * @type {boolean}
   * @memberof IMenuItem
   */
  splitLineTop?: boolean;
  /**
   * @description 下分割线
   * @type {boolean}
   * @memberof IMenuItem
   */
  splitLineBottom?: boolean;
  /**
   * @description key
   * @type {string}
   * @memberof IMenuItem
   */
  key: string;
  /**
   * @description 子菜单
   * @type {IMenuItem[]}
   * @memberof IMenuItem
   */
  children?: IMenuItem[];
}

/**
 * @description 模态基类
 * @author angle
 * @date 2020-07-24
 * @abstract
 * @class ModalBase
 */
abstract class ModalBase {
  /**
   * @description 模态容器, 模态面板的父节点
   * @private
   * @static
   * @type {HTMLDivElement}
   * @memberof ModalBase
   */
  private static modalContainerElement: HTMLDivElement;
  /**
   * @description 遮罩层节点
   * @private
   * @static
   * @type {HTMLDivElement}
   * @memberof ModalBase
   */
  private static maskElement: HTMLDivElement;
  /**
   * @description 当前显示的模态对象,同一时间内最多只能有一个模态显示出来
   * @private
   * @static
   * @type {(ModalBase | null)}
   * @memberof ModalBase
   */
  private static showModal: ModalBase | null = null;
  /**
   * @description 当前显示的所有子菜单节点
   * @private
   * @static
   * @type {HTMLElement[]}
   * @memberof ModalBase
   */
  private static showSubModalElementList: HTMLElement[] = [];
  /**
   * @description 有下级菜单的菜单项data-type标示
   * @private
   * @static
   * @memberof ModalBase
   */
  private static readonly TYPE_SHOW_SUB_MENU_ITEM = 'show-sub-menu-item';
  /**
   * @description 可点击菜单项data-type标示
   * @private
   * @static
   * @type {string}
   * @memberof ModalBase
   */
  private static readonly TYPE_MENU_ITEM: string = 'menu-item';
  /**
   * @description 子菜单节点ata-type标示
   * @private
   * @static
   * @type {string}
   * @memberof ModalBase
   */
  private static readonly TYPE_SUB_MENU: string = 'sub-menu';

  /**
   * @description 配置项
   * @private
   * @type {IModalBaseOptions}
   * @memberof ModalBase
   */
  private readonly options: IModalBaseOptions;
  /**
   * @description 模态面板节点
   * @protected
   * @type {HTMLDivElement}
   * @memberof ModalBase
   */
  protected readonly modalElement: HTMLDivElement;

  constructor(options: IModalBaseOptions) {
    this.options = options;

    if (!ModalBase.modalContainerElement) {
      this.initModal();
    }

    this.modalElement = this.createdModal();
  }

  /**
   * @description 模态面板内容渲染函数
   * @author angle
   * @date 2020-07-24
   * @protected
   * @abstract
   * @returns {(string | HTMLElement)} 内容的html/节点
   * @memberof ModalBase
   */
  protected abstract contentRender(): string | HTMLElement;

  /**
   * @description 面板显示
   * @author angle
   * @date 2020-07-24
   * @param {IPosition} position 显示位置
   * @memberof ModalBase
   */
  public show(position: IPosition): void {
    if (ModalBase.showModal) {
      // 关闭上一个modal
      ModalBase.showModal.hide(false);
    } else {
      // bug: 修复显示时光标节点在遮罩层上
      setTimeout(() => ModalBase.maskElement.classList.add(style.active));
    }
    ModalBase.showModal = this;

    this.modalElement.style.left = addSizeUnit(position.left);
    this.modalElement.style.top = addSizeUnit(position.top);
    if (this.options.maskClassName) {
      // 添加定制化的遮罩层class
      ModalBase.maskElement.classList.add(this.options.maskClassName);
    }
    this.modalElement.classList.add(style.active);
  }

  /**
   * @description 面板关闭
   * @author angle
   * @date 2020-07-24
   * @param {boolean} [isCloseMask=true] 是否关闭遮罩层
   * @memberof ModalBase
   */
  public hide(isCloseMask: boolean = true): void {
    this.closeAllSubMenu();
    this.modalElement.classList.remove(style.active);
    if (isCloseMask) {
      ModalBase.maskElement.classList.remove(style.active);
    }
    if (this.options.maskClassName) {
      ModalBase.maskElement.classList.remove(this.options.maskClassName);
    }
    ModalBase.showModal = null;
  }

  /**
   * @description 初始化模态的基础结构
   * @author angle
   * @date 2020-07-24
   * @private
   * @memberof ModalBase
   */
  private initModal(): void {
    ModalBase.modalContainerElement = this.createdModalContainer();
    ModalBase.maskElement = this.createMask();
    this.bind();
  }

  /**
   * @description 创建模态容器节点
   * @author angle
   * @date 2020-07-24
   * @private
   * @returns {HTMLDivElement} 容器节点
   * @memberof ModalBase
   */
  private createdModalContainer(): HTMLDivElement {
    const containerElement: HTMLDivElement = document.createElement<'div'>('div');
    containerElement.classList.add(style.modalContainer);

    document.body.appendChild<HTMLDivElement>(containerElement);
    return containerElement;
  }

  /**
   * @description 创建遮罩节点
   * @author angle
   * @date 2020-07-24
   * @private
   * @returns {HTMLDivElement} 遮罩节点
   * @memberof ModalBase
   */
  private createMask(): HTMLDivElement {
    const maskElement: HTMLDivElement = document.createElement<'div'>('div');
    maskElement.classList.add(style.mask);
    ModalBase.modalContainerElement.appendChild<HTMLDivElement>(maskElement);
    return maskElement;
  }

  /**
   * @description 创建面板
   * @author angle
   * @date 2020-07-24
   * @private
   * @returns {HTMLDivElement} 面板节点
   * @memberof ModalBase
   */
  private createdModal(): HTMLDivElement {
    const modal: HTMLDivElement = document.createElement<'div'>('div');
    modal.classList.add(style.modal);

    // 子类的渲染方法需要在对象构造完成时才能获取对象本身属性方法,所以把构造面板push微任务队列中执行
    new Promise((resolve) => resolve()).then(() => {
      const child: string | HTMLElement = this.contentRender();
      if (isString(child)) {
        modal.innerHTML = child;
      } else {
        modal.appendChild<HTMLElement>(child);
      }
      ModalBase.modalContainerElement.appendChild<HTMLDivElement>(modal);
    });

    return modal;
  }

  /**
   * @description 版定事件
   * @author angle
   * @date 2020-07-24
   * @private
   * @memberof ModalBase
   */
  private bind(): void {
    this.unBind();
    ModalBase.modalContainerElement.addEventListener<'mousedown'>(
      'mousedown',
      this.mousedownHandler
    );
    ModalBase.modalContainerElement.addEventListener<'mouseover'>(
      'mouseover',
      this.mouseOverHandler
    );
  }

  /**
   * @description 取消节点版定
   * @author angle
   * @date 2020-07-24
   * @private
   * @memberof ModalBase
   */
  private unBind(): void {
    ModalBase.modalContainerElement.removeEventListener<'mousedown'>(
      'mousedown',
      this.mousedownHandler
    );
    ModalBase.modalContainerElement.removeEventListener<'mouseover'>(
      'mouseover',
      this.mouseOverHandler
    );
  }

  /**
   * @description 点击事件
   * @author angle
   * @date 2020-07-24
   * @private
   * @param {MouseEvent} event
   * @memberof ModalBase
   */
  @autoBind
  private mousedownHandler(event: MouseEvent): void {
    if (event.target instanceof HTMLElement) {
      if (event.target === ModalBase.maskElement) {
        ModalBase.showModal?.hide();
      } else {
        const menuItem = findParentElement(
          event.target,
          (element) => element.getAttribute('data-type') === ModalBase.TYPE_MENU_ITEM,
          (element) => element === this.modalElement,
          true
        );
        if (menuItem) {
          this.menuItemClickHandler(menuItem.getAttribute('data-key'));
        }
      }
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * @description 鼠标移入事件
   * @author angle
   * @date 2020-08-05
   * @private
   * @param {MouseEvent} event
   * @memberof ModalBase
   */
  @autoBind
  private mouseOverHandler(event: MouseEvent): void {
    if (event.target instanceof HTMLElement) {
      const menuItem = findParentElement(
        event.target,
        (element) => element.getAttribute('data-type') === ModalBase.TYPE_SHOW_SUB_MENU_ITEM,
        (element) => element === this.modalElement,
        true
      );
      if (menuItem) {
        const subMenuElement = ModalBase.modalContainerElement.querySelector<HTMLUListElement>(
          `[data-type=${ModalBase.TYPE_SUB_MENU}][data-parent-key=${menuItem.getAttribute(
            'data-key'
          )}]`
        );
        if (subMenuElement) {
          const rect = menuItem.getBoundingClientRect();
          subMenuElement.style.left = `${rect.left + rect.width}px`;
          subMenuElement.style.top = `${rect.top}px`;
          subMenuElement.classList.add(style.active);
          ModalBase.showSubModalElementList.push(subMenuElement);
        }
      } else if (
        !findParentElement(
          event.target,
          (element) => element.getAttribute('data-type') === ModalBase.TYPE_SUB_MENU,
          (element) => element === this.modalElement,
          true
        )
      ) {
        this.closeAllSubMenu();
      }
    }
  }

  /**
   * @description 创建子菜单
   * @author angle
   * @date 2020-08-05
   * @private
   * @param {IMenuItem[]} menuList
   * @returns {HTMLUListElement}
   * @memberof ModalBase
   */
  private createdSubMenu(menuList: IMenuItem[]): HTMLUListElement {
    const subMenuElement: HTMLUListElement = document.createElement<'ul'>('ul');
    subMenuElement.classList.add(style.modal);
    menuList.forEach((item) => subMenuElement.appendChild(this.createdMenuItem<'li'>(item, 'li')));
    return subMenuElement;
  }

  /**
   * @description 关闭所有显示的子菜单
   * @author angle
   * @date 2020-08-05
   * @private
   * @memberof ModalBase
   */
  private closeAllSubMenu(): void {
    ModalBase.showSubModalElementList.forEach((item) => item.classList.remove(style.active));
    ModalBase.showSubModalElementList = [];
  }

  /**
   * @description 创建菜单项
   * @author angle
   * @date 2020-07-24
   * @protected
   * @param {IMenuItem} item 数据项
   * @returns {HTMLDivElement}
   * @memberof ModalBase
   */
  protected createdMenuItem(item: IMenuItem): HTMLDivElement;

  /**
   * @description 创建菜单项
   * @author angle
   * @date 2020-07-24
   * @protected
   * @template K
   * @param {IMenuItem} item 数据项
   * @param {K} tagName 标签名
   * @returns {HTMLElementTagNameMap[K]}
   * @memberof ModalBase
   */
  protected createdMenuItem<K extends keyof HTMLElementTagNameMap>(
    item: IMenuItem,
    tagName: K
  ): HTMLElementTagNameMap[K];

  protected createdMenuItem<K extends keyof HTMLElementTagNameMap = 'div'>(
    item: IMenuItem,
    tagName?: K
  ): HTMLElementTagNameMap[K] | HTMLDivElement {
    const itemElement = document.createElement<K | 'div'>(tagName ?? 'div');
    addClass(itemElement, [
      style.menuItem,
      {
        [style.splitLineTop]: item.splitLineTop ?? false,
        [style.splitLineBottom]: item.splitLineBottom ?? false
      }
    ]);
    itemElement.setAttribute(
      'data-type',
      item.children?.length ? ModalBase.TYPE_SHOW_SUB_MENU_ITEM : ModalBase.TYPE_MENU_ITEM
    );
    itemElement.setAttribute('data-key', item.key);

    const titleElement: HTMLSpanElement = document.createElement<'span'>('span');
    titleElement.classList.add(style.title);
    titleElement.innerText = item.text;

    const subTitleElement: HTMLSpanElement = document.createElement<'span'>('span');
    subTitleElement.classList.add(style.subTitle);
    subTitleElement.innerText = item.subText ?? '';

    itemElement.appendChild(titleElement);
    itemElement.appendChild(subTitleElement);

    if (item.children?.length) {
      const iconElement: HTMLSpanElement = document.createElement<'span'>('span');
      iconElement.classList.add('iconfont', 'icon-arrow-right');
      itemElement.appendChild(iconElement);

      const subMenuElement: HTMLUListElement = this.createdSubMenu(item.children);
      subMenuElement.setAttribute('data-type', ModalBase.TYPE_SUB_MENU);
      subMenuElement.setAttribute('data-parent-key', item.key);

      ModalBase.modalContainerElement.appendChild(subMenuElement);
    }

    return itemElement;
  }

  /**
   * @description 菜单点击事件,子类可重写实现
   * @author angle
   * @date 2020-07-24
   * @protected
   * @param {(string | null)} _key
   * @memberof ModalBase
   */
  @override
  protected menuItemClickHandler(_key: string | null): void {}
}

export default ModalBase;
