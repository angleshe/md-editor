import { IEditor } from '../../index';
import style from 'style/editor.modules.scss';
import { autoBind } from '../utils/decorators';
import { input } from './input';

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
    this.contentDom.addEventListener<'input'>('input', this.inputHandler);
  }

  private unbind(): void {
    this.contentDom.removeEventListener<'input'>('input', this.inputHandler);
  }

  /**
   * @description
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
