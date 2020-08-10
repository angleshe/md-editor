/* eslint-disable @typescript-eslint/camelcase */
import DiffMatchPatch, { diff_match_patch, patch_obj } from 'diff-match-patch';
import { IEditor } from '..';
import { setRangeByWbr, getRange } from './utils/selection';
/**
 * @description 编辑记录
 * @author angle
 * @date 2020-08-10
 * @class Undo
 */
class Undo {
  /**
   * @description 记录最大条数
   * @private
   * @static
   * @type {number}
   * @memberof Undo
   */
  private static readonly stackSize: number = 50;

  /**
   * @description 比较工具类
   * @private
   * @type {diff_match_patch}
   * @memberof Undo
   */
  private readonly dmp: diff_match_patch;

  /**
   * @description 后一步记录栈
   * @private
   * @type {patch_obj[][]}
   * @memberof Undo
   */
  private readonly redoStack: patch_obj[][] = [];

  /**
   * @description 前一步记录栈
   * @private
   * @type {patch_obj[][]}
   * @memberof Undo
   */
  private readonly undoStack: patch_obj[][] = [];

  /**
   * @description 最后一步记录文本
   * @private
   * @type {string}
   * @memberof Undo
   */
  private lastText: string = '';

  private readonly editor: IEditor;

  constructor(editor: IEditor) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.dmp = new DiffMatchPatch();
    this.editor = editor;
  }

  /**
   * @description 进入记录栈
   * @author angle
   * @date 2020-08-10
   * @memberof Undo
   */
  public addToUndoStack(): void {
    const contents: string = this.getContents();
    const diff = this.dmp.diff_main(contents, this.lastText);
    const patchList = this.dmp.patch_make(contents, this.lastText, diff);
    this.lastText = contents;
    if (this.undoStack.length > Undo.stackSize - 1) {
      this.undoStack.shift();
    }
    this.undoStack.push(patchList);
  }

  /**
   * @description 前一步
   * @author angle
   * @date 2020-08-10
   * @memberof Undo
   */
  public undo(): void {
    if (this.undoStack.length && this.editor.ir) {
      const patchList = this.undoStack.pop()!;
      this.redoStack.push(patchList);
      this.lastText = this.dmp.patch_apply(patchList, this.lastText)[0];
      this.editor.ir.contentDom.innerHTML = this.lastText;
      setRangeByWbr(this.editor.ir.contentDom);
    }
  }

  /**
   * @description 后一步
   * @author angle
   * @date 2020-08-10
   * @memberof Undo
   */
  public redo(): void {
    if (this.redoStack.length && this.editor.ir) {
      console.log('redo');
      const patchList = this.redoStack.pop()!;
      this.undoStack.push(patchList);
      //
      const redoPatchList = this.dmp.patch_deepCopy(patchList).reverse();
      redoPatchList.forEach((patch) => patch.diffs.forEach((diff) => (diff[0] = -diff[0])));
      this.lastText = this.dmp.patch_apply(redoPatchList, this.lastText)[0];
      //
      this.editor.ir.contentDom.innerHTML = this.lastText;
      setRangeByWbr(this.editor.ir.contentDom);
    }
  }

  /**
   * @description 获取当前内容
   * @author angle
   * @date 2020-08-10
   * @private
   * @returns {string}
   * @memberof Undo
   */
  private getContents(): string {
    if (this.editor.ir) {
      if (this.editor.ir.contentDom.querySelector<'wbr'>('wbr')) {
        return this.editor.ir.contentDom.innerHTML;
      }
      const wbrElement: HTMLElement = document.createElement<'wbr'>('wbr');
      const range = getRange();
      if (range) {
        range.insertNode(wbrElement);
      }
      const contents: string = this.editor.ir.contentDom.innerHTML;
      wbrElement.remove();
      return contents;
    }
    return '';
  }
}

export default Undo;
