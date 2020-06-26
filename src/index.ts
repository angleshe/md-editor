import Options, { ElementType, IOptions } from './script/Options';
import { isString } from './script/utils/utils';
import { initUi } from './script/ui';

export interface IEditor {
  options: Required<IOptions>;
  element: HTMLElement;
  contentElement: HTMLPreElement;
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
      element,
      contentElement: document.createElement<'pre'>('pre')
    };

    initUi(this.editor);
  }
}

export default MdEditor;
