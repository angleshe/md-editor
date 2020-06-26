import { addSizeUnit } from './utils/utils';

export type ElementType = HTMLElement | string;

/**
 * @description 配置项
 * @author angle
 * @date 2020-06-26
 * @interface IOptions
 */
export interface IOptions {
  /**
   * @description 渲染节点
   * @type {ElementType}
   * @memberof IOptions
   */
  el: ElementType;
  /**
   * @description 编辑内容长度
   * @type {(number | string)}
   * @memberof IOptions
   */
  width?: number | string;
  /**
   * @description 编辑内容高度
   * @type {(number | string)}
   * @memberof IOptions
   */
  height?: number | string;
  /**
   * @description 编辑内容最小高度
   * @type {(number | string)}
   * @memberof IOptions
   */
  minHeight?: number | string;
}
export default class Options {
  private options: IOptions;
  private defaultOptions: Omit<Required<IOptions>, 'el'> = {
    width: '80%',
    height: '100%',
    minHeight: '30vh'
  };

  constructor(options: IOptions) {
    this.options = options;
  }

  getOptions(): Required<IOptions> {
    return {
      ...this.defaultOptions,
      ...this.options,
      width: this.options.width ? addSizeUnit(this.options.width) : this.defaultOptions.width,
      height: this.options.height ? addSizeUnit(this.options.height) : this.defaultOptions.height,
      minHeight: this.options.minHeight
        ? addSizeUnit(this.options.minHeight)
        : this.defaultOptions.minHeight
    };
  }
}
