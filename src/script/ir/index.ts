import { IEditor } from '../../index';
import style from 'style/editor.modules.scss';
import { autoBind } from '../utils/decorators';
import { input } from './input';
import { processKeydown } from './processKeydown';
import { processMousedown } from './processMousedown';

class IR {
  private readonly editor: IEditor;

  public readonly contentDom: HTMLPreElement;

  constructor(editor: IEditor) {
    this.editor = editor;
    this.contentDom = document.createElement<'pre'>('pre');
    this.render();
  }

  private render(): void {
    this.contentDom.classList.add(style.content);
    this.contentDom.contentEditable = 'true';
    this.contentDom.setAttribute('placeholder', this.editor.options.placeholder);
    this.contentDom.style.width = this.editor.options.width as string;
    this.editor.element.appendChild(this.contentDom);
  }

  private bind(): void {
    this.unbind();
    this.contentDom.addEventListener<'keydown'>('keydown', this.keydownHandler);
    this.contentDom.addEventListener<'input'>('input', this.inputHandler);
    this.contentDom.addEventListener<'mousedown'>('mousedown', this.mousedownHandler);
    window.addEventListener<'contextmenu'>('contextmenu', this.contextmenuHandler);
  }

  private unbind(): void {
    this.contentDom.removeEventListener<'keydown'>('keydown', this.keydownHandler);
    this.contentDom.removeEventListener<'input'>('input', this.inputHandler);
    this.contentDom.removeEventListener<'mousedown'>('mousedown', this.mousedownHandler);
    window.removeEventListener<'contextmenu'>('contextmenu', this.contextmenuHandler);
  }

  /**
   * @description 输入内容事件
   * @author angle
   * @date 2020-07-04
   * @private
   * @memberof IR
   * @autoBind
   */
  @autoBind
  private inputHandler(): void {
    const selection = getSelection();
    if (selection) {
      const range: Range = selection.getRangeAt(0).cloneRange();
      input(this.editor, range);
    }
  }

  /**
   * @description 按钮事件
   * @author angle
   * @date 2020-07-07
   * @private
   * @param {KeyboardEvent} event
   * @memberof IR
   */
  @autoBind
  private keydownHandler(event: KeyboardEvent): void {
    processKeydown(this.editor, event);
  }

  /**
   * @description 鼠标事件
   * @author angle
   * @date 2020-07-23
   * @private
   * @param {MouseEvent} event
   * @memberof IR
   */
  @autoBind
  private mousedownHandler(event: MouseEvent): void {
    processMousedown(this.editor, event);
  }

  /**
   * @description 屏蔽鼠标右键菜单
   * @author angle
   * @date 2020-07-23
   * @private
   * @param {MouseEvent} event
   * @memberof IR
   */
  @autoBind
  private contextmenuHandler(event: MouseEvent): void {
    event.preventDefault();
  }

  show(): void {
    this.bind();
    this.contentDom.classList.add(style.show);
  }

  hide(): void {
    this.unbind();
    this.contentDom.classList.remove(style.show);
  }
}

export default IR;
