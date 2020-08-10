import Options, { ElementType, IOptions } from './script/Options';
import { isString } from './script/utils/utils';
import { initUi } from './script/ui';
import IR from './script/ir';
import { addScript } from './script/utils/addPublicRes';
import { createdLute } from './script/markdown/lute';
import 'res/iconFonts/iconfont.css';
import Undo from './script/Undo';

export interface IEditor {
  options: Required<IOptions>;
  element: HTMLElement;
  ir?: IR;
  lute?: Lute;
  undo?: Undo;
}

class MdEditor {
  private editor: IEditor;

  /**
   *Creates an instance of MdEditor.
   * @author angle
   * @date 2020-06-26
   * @param {ElementType} el 渲染节点
   * @memberof MdEditor
   */
  constructor(el: ElementType);
  /**
   *Creates an instance of MdEditor.
   * @author angle
   * @date 2020-06-26
   * @param {IOptions} options 配置项
   * @memberof MdEditor
   */
  constructor(options: IOptions);

  constructor(param: ElementType | IOptions) {
    let initOptions: IOptions;
    if (isString(param) || param instanceof HTMLElement) {
      initOptions = {
        el: param
      };
    } else {
      initOptions = param;
    }
    const optionsObj = new Options(initOptions);
    const options = optionsObj.getOptions();
    const element =
      options.el instanceof HTMLElement
        ? options.el
        : document.querySelector<HTMLElement>(options.el);

    if (element === null) {
      throw new Error('找不到容器节点!');
    }

    this.editor = {
      options,
      element
    };

    this.injectLute();

    initUi(this.editor);

    this.editor.ir = new IR(this.editor);

    this.editor.undo = new Undo(this.editor);

    this.editor.ir.show();
  }

  /**
   * @description 注入Lute
   * @author angle
   * @date 2020-06-27
   * @private
   * @returns {Promise<void>}
   * @memberof MdEditor
   */
  private async injectLute(): Promise<void> {
    if (!window.Lute) {
      await addScript(this.editor.options.LuteUrl, 'LuteScript');
    }
    this.editor.lute = createdLute({
      autoSpace: this.editor.options.preview.markdown?.autoSpace,
      chinesePunct: this.editor.options.preview.markdown?.chinesePunct,
      codeBlockPreview: this.editor.options.preview.markdown?.codeBlockPreview,
      emojiSite: this.editor.options.hint.emojiPath ?? '',
      emojis: this.editor.options.hint.emoji ?? {},
      fixTermTypo: this.editor.options.preview.markdown?.fixTermTypo,
      footnotes: this.editor.options.preview.markdown?.footnotes,
      headingAnchor: false,
      inlineMathDigit: this.editor.options.preview.math?.inlineDigit,
      linkBase: this.editor.options.preview.markdown?.linkBase,
      listStyle: this.editor.options.preview.markdown?.listStyle,
      paragraphBeginningSpace: this.editor.options.preview.markdown?.paragraphBeginningSpace,
      sanitize: this.editor.options.preview.markdown?.sanitize,
      setext: this.editor.options.preview.markdown?.setext,
      toc: this.editor.options.preview.markdown?.toc
    });
  }
}

export default MdEditor;
