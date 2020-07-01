import { addSizeUnit } from './utils/utils';
import { IMarkdownConfig } from './markdown/lute';

export type ElementType = HTMLElement | string;

/** @link https://hacpai.com/article/1549638745630#options-preview-math */
interface IMath {
  /** 内联数学公式起始 $ 后是否允许数字。默认值: false */
  inlineDigit: boolean;
}

/** @link https://hacpai.com/article/1549638745630#options-hint */
interface IHint {
  /** 默认表情，可从 [lute/emoji_map](https://github.com/88250/lute/blob/master/parse/emoji_map.go#L32) 中选取，也可自定义 */
  emoji?: { [key: string]: string };
  /** 表情图片地址。默认值: 'https://cdn.jsdelivr.net/npm/vditor@${VDITOR_VERSION}/dist/images/emoji' */
  emojiPath?: string;
}

interface IPreview {
  /** @link https://hacpai.com/article/1549638745630#options-preview-markdown */
  markdown?: IMarkdownConfig;
  /** @link https://hacpai.com/article/1549638745630#options-preview-math */
  math?: IMath;
}

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
  /**
   * @description 提示信息
   * @type {string}
   * @memberof IOptions
   */
  placeholder?: string;
  /**
   * @description Lute脚本加载路径
   * @type {string}
   * @memberof IOptions
   */
  LuteUrl?: string;
  /**
   * @description 视图配置
   * @type {IPreview}
   * @memberof IOptions
   */
  preview?: IPreview;
  /**
   * @description 表情
   * @type {IHint}
   * @memberof IOptions
   */
  hint?: IHint;
}
export default class Options {
  private options: IOptions;
  private defaultOptions: Required<Omit<IOptions, 'el'>> = {
    width: '80%',
    height: '100%',
    minHeight: '30vh',
    placeholder: '',
    LuteUrl: '/lib/lute.min.js',
    preview: {
      markdown: {
        autoSpace: false,
        chinesePunct: false,
        codeBlockPreview: true,
        fixTermTypo: false,
        footnotes: true,
        linkBase: '',
        listStyle: false,
        sanitize: true,
        setext: false,
        theme: 'light',
        toc: false
      },
      math: {
        inlineDigit: false
      }
    },
    hint: {
      emoji: {
        '+1': '👍',
        '-1': '👎',
        confused: '😕',
        eyes: '👀️',
        heart: '❤️',
        rocket: '🚀️',
        smile: '😄',
        tada: '🎉️'
      },
      emojiPath: ''
    }
  };

  constructor(options: IOptions) {
    this.options = options;
  }

  getOptions(): Required<IOptions> {
    if (this.options.width) {
      this.options.width = addSizeUnit(this.options.width);
    }
    if (this.options.height) {
      this.options.height = addSizeUnit(this.options.height);
    }
    if (this.options.minHeight) {
      this.options.minHeight = addSizeUnit(this.options.minHeight);
    }
    if (this.options.preview) {
      this.options.preview = Object.assign({}, this.defaultOptions.preview, this.options.preview);
    }
    if (this.options.hint) {
      this.options.hint = Object.assign({}, this.defaultOptions.hint, this.options.hint);
    }
    return Object.assign({}, this.defaultOptions, this.options);
  }
}
