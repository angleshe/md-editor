/* eslint-disable @typescript-eslint/interface-name-prefix */
declare module '*.scss';

declare class Lute {
  public static WalkStop: number;
  public static WalkSkipChildren: number;
  public static WalkContinue: number;
  public static Version: string;
  public static New(): Lute;

  GetHeadingID(node: ILuteNode): string;

  SetJSRenderers(options?: {
    renderers: {
      HTML2VditorDOM?: ILuteRender;
      HTML2VditorIRDOM?: ILuteRender;
      HTML2Md?: ILuteRender;
      Md2HTML?: ILuteRender;
      Md2VditorDOM?: ILuteRender;
      Md2VditorIRDOM?: ILuteRender;
    };
  }): void;

  SetChineseParagraphBeginningSpace(enable?: boolean): void;

  SetRenderListStyle(enable?: boolean): void;

  SetLinkBase(url?: string): void;

  SetSanitize(enable?: boolean): void;

  SetHeadingAnchor(enable: boolean): void;

  SetImageLazyLoading(imagePath: string): void;

  SetInlineMathAllowDigitAfterOpenMarker(enable?: boolean): void;

  SetToC(enable?: boolean): void;

  SetFootnotes(enable?: boolean): void;

  SetAutoSpace(enable?: boolean): void;

  SetChinesePunct(enable?: boolean): void;

  SetFixTermTypo(enable?: boolean): void;

  SetEmojiSite(emojiSite: string): void;

  SetSetext(enable?: boolean): void;

  SetVditorCodeBlockPreview(enable?: boolean): void;

  PutEmojis(emojis: { [key: string]: string }): void;

  GetEmojis(): { [key: string]: string };

  FormatMd(markdown: string): string;

  // debugger md
  RenderEChartsJSON(text: string): string;

  // md 转换为 html
  Md2HTML(markdown: string): string;

  // 粘贴时将 html 转换为 md
  HTML2Md(html: string): string;

  // wysiwyg 转换为 html
  VditorDOM2HTML(vhtml: string): string;

  // wysiwyg 输入渲染
  SpinVditorDOM(html: string): string;

  // 粘贴时将 html 转换为 wysiwyg
  HTML2VditorDOM(html: string): string;

  // 将 wysiwyg 转换为 md
  VditorDOM2Md(html: string): string;

  // 将 md 转换为 wysiwyg
  Md2VditorDOM(markdown: string): string;

  // ir 输入渲染
  SpinVditorIRDOM(markdown: string): string;

  // ir 获取 md
  VditorIRDOM2Md(html: string): string;

  // md 转换为 ir
  Md2VditorIRDOM(html: string): string;

  // 获取 HTML
  VditorIRDOM2HTML(html: string): string;

  HTML2VditorIRDOM(html: string): string;
}

interface Window {
  Lute: typeof Lute;
  clipboardData: DataTransfer | null;
}
interface ILuteNode {
  TokensStr: () => string;
  __internal_object__: {
    Parent: {
      Type: number;
    };
    HeadingLevel: string;
  };
}

type ILuteRenderCallback = (node: ILuteNode, entering: boolean) => [string, number];

/** @link https://hacpai.com/article/1588412297062 */
interface ILuteRender {
  renderDocument?: ILuteRenderCallback;
  renderParagraph?: ILuteRenderCallback;
  renderText?: ILuteRenderCallback;
  renderCodeBlock?: ILuteRenderCallback;
  renderCodeBlockOpenMarker?: ILuteRenderCallback;
  renderCodeBlockInfoMarker?: ILuteRenderCallback;
  renderCodeBlockCode?: ILuteRenderCallback;
  renderCodeBlockCloseMarker?: ILuteRenderCallback;
  renderMathBlock?: ILuteRenderCallback;
  renderMathBlockOpenMarker?: ILuteRenderCallback;
  renderMathBlockContent?: ILuteRenderCallback;
  renderMathBlockCloseMarker?: ILuteRenderCallback;
  renderBlockquote?: ILuteRenderCallback;
  renderBlockquoteMarker?: ILuteRenderCallback;
  renderHeading?: ILuteRenderCallback;
  renderHeadingC8hMarker?: ILuteRenderCallback;
  renderList?: ILuteRenderCallback;
  renderListItem?: ILuteRenderCallback;
  renderTaskListItemMarker?: ILuteRenderCallback;
  renderThematicBreak?: ILuteRenderCallback;
  renderHTML?: ILuteRenderCallback;
  renderTable?: ILuteRenderCallback;
  renderTableHead?: ILuteRenderCallback;
  renderTableRow?: ILuteRenderCallback;
  renderTableCell?: ILuteRenderCallback;
  renderFootnotesDef?: ILuteRenderCallback;
  renderCodeSpan?: ILuteRenderCallback;
  renderCodeSpanOpenMarker?: ILuteRenderCallback;
  renderCodeSpanContent?: ILuteRenderCallback;
  renderCodeSpanCloseMarker?: ILuteRenderCallback;
  renderInlineMath?: ILuteRenderCallback;
  renderInlineMathOpenMarker?: ILuteRenderCallback;
  renderInlineMathContent?: ILuteRenderCallback;
  renderInlineMathCloseMarker?: ILuteRenderCallback;
  renderEmphasis?: ILuteRenderCallback;
  renderEmAsteriskOpenMarker?: ILuteRenderCallback;
  renderEmAsteriskCloseMarker?: ILuteRenderCallback;
  renderEmUnderscoreOpenMarker?: ILuteRenderCallback;
  renderEmUnderscoreCloseMarker?: ILuteRenderCallback;
  renderStrong?: ILuteRenderCallback;
  renderStrongA6kOpenMarker?: ILuteRenderCallback;
  renderStrongA6kCloseMarker?: ILuteRenderCallback;
  renderStrongU8eOpenMarker?: ILuteRenderCallback;
  renderStrongU8eCloseMarker?: ILuteRenderCallback;
  renderStrikethrough?: ILuteRenderCallback;
  renderStrikethrough1OpenMarker?: ILuteRenderCallback;
  renderStrikethrough1CloseMarker?: ILuteRenderCallback;
  renderStrikethrough2OpenMarker?: ILuteRenderCallback;
  renderStrikethrough2CloseMarker?: ILuteRenderCallback;
  renderHardBreak?: ILuteRenderCallback;
  renderSoftBreak?: ILuteRenderCallback;
  renderInlineHTML?: ILuteRenderCallback;
  renderLink?: ILuteRenderCallback;
  renderOpenBracket?: ILuteRenderCallback;
  renderCloseBracket?: ILuteRenderCallback;
  renderOpenParen?: ILuteRenderCallback;
  renderCloseParen?: ILuteRenderCallback;
  renderLinkText?: ILuteRenderCallback;
  renderLinkSpace?: ILuteRenderCallback;
  renderLinkDest?: ILuteRenderCallback;
  renderLinkTitle?: ILuteRenderCallback;
  renderImage?: ILuteRenderCallback;
  renderBang?: ILuteRenderCallback;
  renderEmoji?: ILuteRenderCallback;
  renderEmojiUnicode?: ILuteRenderCallback;
  renderEmojiImg?: ILuteRenderCallback;
  renderEmojiAlias?: ILuteRenderCallback;
  renderToC?: ILuteRenderCallback;
  renderFootnotesRef?: ILuteRenderCallback;
  renderBackslash?: ILuteRenderCallback;
  renderBackslashContent?: ILuteRenderCallback;
}
