import { IEditor } from '../../index';
import { fixCodeLanguage, fixCodeBlock, fixTable } from '../utils/fixBrowserBehavior';

/**
 * @description 按键处理
 * @author angle
 * @date 2020-07-07
 * @export
 * @param {IEditor} editor
 * @param {KeyboardEvent} event 按钮事件
 */
export function processKeydown(editor: IEditor, event: KeyboardEvent): void {
  const range: Range = document.getSelection()!.getRangeAt(0);
  if (fixCodeLanguage(editor, event, range)) {
    return;
  }
  if (fixCodeBlock(editor, event, range)) {
    return;
  }
  if (fixTable(editor, event, range)) {
    return;
  }
}
