import { IEditor } from '@/index';
import { setRangeByWbr } from '../utils/selection';
import { getClosestBlock } from '../utils/closestBlock';
import { log } from '../utils/log';
/**
 * @description 解析替换视图md,并设置光标
 * @todo 解析前在光标位置添加wbr标签, 替换md把光标移到wbr标签前并删除wbr
 * @todo 跟新策略: 获取光标最近的块级element进行解析渲染
 * @author angle
 * @date 2020-07-01
 * @export
 * @param {IEditor} editor
 * @param {Range} range
 */
export function input(editor: IEditor, range: Range): void {
  // 获取最近块级元素
  const closestBlock = getClosestBlock(range.startContainer);
  // 插入wbr
  range.insertNode(document.createElement<'wbr'>('wbr'));
  //
  if (editor.ir && editor.ir.contentDom && editor.ir.contentDom.innerHTML) {
    let content: string;
    if (closestBlock && !closestBlock.isEqualNode(editor.ir.contentDom)) {
      content = closestBlock.outerHTML;
    } else {
      content = editor.ir.contentDom.innerHTML;
    }
    log('ir/input', content, '解析md内容', editor.options.debugger);
    let html: string = editor.lute?.SpinVditorIRDOM(content) ?? '';
    // 过滤\n
    html = html.replace(/\n/g, '');
    //
    if (editor.options.transform) {
      html = editor.options.transform(html);
    }
    //
    log('ir/input', html, '渲染内容', editor.options.debugger);
    //
    if (closestBlock && !closestBlock.isEqualNode(editor.ir.contentDom)) {
      closestBlock.outerHTML = html;
    } else {
      editor.ir.contentDom.innerHTML = html;
    }
    //
    setRangeByWbr(editor.ir.contentDom, range);
  }
}
