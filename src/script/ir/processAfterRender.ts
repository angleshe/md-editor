import { IEditor } from '@/index';

let timer: number | null = null;

/**
 * @description 渲染结束处理
 * @author angle
 * @date 2020-08-10
 * @export
 * @param {IEditor} editor
 */
export function processAfterRender(editor: IEditor): void {
  if (timer) {
    clearTimeout(timer);
  }
  timer = window.setTimeout(() => {
    if (editor.undo) {
      editor.undo.addToUndoStack();
    }
    timer = null;
  }, 500);
}
