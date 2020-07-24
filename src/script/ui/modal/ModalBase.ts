import style from 'style/modal.modules.scss';
import { isString, addSizeUnit } from '@/script/utils/utils';

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
      ModalBase.maskElement.classList.add(style.active);
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

    const child: string | HTMLElement = this.contentRender();

    if (isString(child)) {
      modal.innerHTML = child;
    } else {
      modal.appendChild<HTMLElement>(child);
    }

    ModalBase.modalContainerElement.appendChild<HTMLDivElement>(modal);
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
    ModalBase.modalContainerElement.addEventListener<'click'>('click', this.clickHandler);
  }

  /**
   * @description 取消节点版定
   * @author angle
   * @date 2020-07-24
   * @private
   * @memberof ModalBase
   */
  private unBind(): void {
    ModalBase.modalContainerElement.removeEventListener<'click'>('click', this.clickHandler);
  }

  /**
   * @description 点击事件
   * @author angle
   * @date 2020-07-24
   * @private
   * @param {MouseEvent} event
   * @memberof ModalBase
   */
  private clickHandler(event: MouseEvent): void {
    if (event.target instanceof HTMLElement && event.target === ModalBase.maskElement) {
      ModalBase.showModal?.hide();
    }
    event.preventDefault();
    event.stopPropagation();
  }
}

export default ModalBase;
