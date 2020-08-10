import { IEditor } from '@/index';

/**
 * @description 渲染结束处理
 * @author angle
 * @date 2020-08-10
 * @export
 * @param {IEditor} editor
 */
export function processAfterRender(editor: IEditor): void {
  if (editor.undo) {
    editor.undo.addToUndoStack();
  }
}
