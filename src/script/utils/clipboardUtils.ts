import { setSelectionFocus, getRange } from './selection';

/**
 * @description 复制文本
 * @author angle
 * @date 2020-08-06
 * @export
 * @param {string} text
 * @param {('text/plain' | 'text/html')} [format='text/plain']
 */
export function copy(text: string, format: 'text/plain' | 'text/html' = 'text/plain'): void {
  const copyElement: HTMLSpanElement = document.createElement<'span'>('span');
  copyElement.textContent = text;
  copyElement.addEventListener<'copy'>('copy', (e) => {
    e.preventDefault();
    if (e.clipboardData) {
      e.clipboardData.clearData();
      e.clipboardData.setData(format, text);
    } else if (window.clipboardData) {
      window.clipboardData.clearData();
      window.clipboardData.setData(format === 'text/plain' ? 'Text' : 'Url', text);
    }
  });
  document.body.appendChild(copyElement);
  const currentRange: Range = getRange()!;
  const range: Range = document.createRange();
  range.selectNodeContents(copyElement);
  setSelectionFocus(range);
  document.execCommand('copy');
  setSelectionFocus(currentRange);
  copyElement.remove();
}
