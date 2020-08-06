/** @link https://hacpai.com/article/1549638745630#options-preview-markdown */
export interface IMarkdownConfig {
  /** 自动空格。默认值: false */
  autoSpace?: boolean;
  /** 段落开头是否空两格。默认值: false */
  paragraphBeginningSpace?: boolean;
  /** 自动矫正术语。默认值: false */
  fixTermTypo?: boolean;
  /** 自动矫正标点。默认值: false */
  chinesePunct?: boolean;
  /** 插入目录。默认值: false */
  toc?: boolean;
  /** 脚注。默认值: true */
  footnotes?: boolean;
  /** wysiwyg & ir 模式代码块是否渲染。默认值: true */
  codeBlockPreview?: boolean;
  /** 是否解析 setext 标题。默认值: false */
  setext?: boolean;
  /** 是否启用过滤 XSS。默认值: true */
  sanitize?: boolean;
  /** 内容主题。默认值：light */
  theme?: string;
  /** 链接前缀。默认值：'' */
  linkBase?: string;
  /** 为列表添加标记，以便[自定义列表样式](https://github.com/Vanessa219/vditor/issues/390) 默认值：false */
  listStyle?: boolean;
}
export interface ILuteOptions extends IMarkdownConfig {
  emojis: { [key: string]: string };
  emojiSite: string;
  headingAnchor: boolean;
  inlineMathDigit?: boolean;
  lazyLoadImage?: string;
}
/**
 * @description 创建Lute
 * @author angle
 * @date 2020-06-27
 * @export
 * @param {ILuteOptions} options
 * @returns {Lute}
 */
export function createdLute(options: ILuteOptions): Lute {
  const lute: Lute = window.Lute.New();
  lute.PutEmojis(options.emojis);
  lute.SetEmojiSite(options.emojiSite);
  lute.SetHeadingAnchor(options.headingAnchor);
  lute.SetInlineMathAllowDigitAfterOpenMarker(options.inlineMathDigit);
  lute.SetAutoSpace(options.autoSpace);
  lute.SetToC(options.toc);
  lute.SetFootnotes(options.footnotes);
  lute.SetChinesePunct(options.chinesePunct);
  lute.SetFixTermTypo(options.fixTermTypo);
  lute.SetVditorCodeBlockPreview(options.codeBlockPreview);
  lute.SetSetext(options.setext);
  lute.SetSanitize(options.sanitize);
  lute.SetChineseParagraphBeginningSpace(options.paragraphBeginningSpace);
  lute.SetRenderListStyle(options.listStyle);
  lute.SetLinkBase(options.linkBase);
  if (options.lazyLoadImage) {
    lute.SetImageLazyLoading(options.lazyLoadImage);
  }
  return lute;
}
