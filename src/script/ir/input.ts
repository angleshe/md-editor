import { IEditor } from '@/index';
import { setRangeByWbr } from '../utils/selection';
/**
 * @description 解析替换视图md,并设置光标
 * @todo 解析前在光标位置添加wbr标签, 替换md把光标移到wbr标签前并删除wbr
 * @author angle
 * @date 2020-07-01
 * @export
 * @param {IEditor} editor
 * @param {Range} range
 */
export function input(editor: IEditor, range: Range): void {
  //
  range.insertNode(document.createElement<'wbr'>('wbr'));
  //
  if (editor.ir && editor.ir.contentDom && editor.ir.contentDom.innerHTML) {
    console.log('innerHTML', editor.ir.contentDom.innerHTML);
    let html: string = editor.lute?.SpinVditorIRDOM(editor.ir.contentDom.innerHTML) ?? '';
    // 过滤\n
    html = html.replace(/\n/g, '');
    console.log('html', html);
    editor.ir.contentDom.innerHTML = html;
    setRangeByWbr(editor.ir.contentDom, range);
  }
}
