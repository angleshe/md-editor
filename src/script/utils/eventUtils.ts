import { isMacSystem } from './domUtils';

/**
 * @description 是否按下windows/ctrl mac/meta键
 * @author angle
 * @date 2020-07-07
 * @export
 * @param {KeyboardEvent} event
 * @returns {boolean}
 */
export function isTouchCtrlKey(event: KeyboardEvent): boolean {
  return isMacSystem() ? event.metaKey && !event.ctrlKey : !event.metaKey && event.ctrlKey;
}

/**
 * @description 是否只按下回车
 * @author angle
 * @date 2020-07-08
 * @export
 * @param {KeyboardEvent} event
 * @returns {boolean}
 */
export function isOnlyTouchEnter(event: KeyboardEvent): boolean {
  return !isTouchCtrlKey(event) && !event.altKey && !event.shiftKey && event.key === 'Enter';
}

/**
 * @description 解析键盘键值
 * @author angle
 * @date 2020-08-06
 * @export
 * @param {string} key
 * @returns {string}
 */
export function parseKey(key: string): string {
  let val: string;
  switch (key) {
    case '↑':
      val = 'ArrowUp';
      break;
    case '↓':
      val = 'ArrowDown';
      break;
    case '←':
      val = 'ArrowLeft';
      break;
    case '→':
      val = 'ArrowRight';
      break;
    default:
      val = key;
      break;
  }
  return val;
}

/**
 * @description 判断是否按下组合快捷键
 * @author angle
 * @date 2020-07-14
 * @export
 * @param {string} hotkey 组合快捷键
 * @param {KeyboardEvent} event 按键事件
 * @param {string} [separator='-'] 分割符
 * @returns {boolean}
 */
export function matchHotKey(
  hotkey: string,
  event: KeyboardEvent,
  separator: string = '-'
): boolean {
  const hotkeys: string[] = hotkey.split(separator);
  const key: string = parseKey(hotkeys[hotkeys.length - 1]);
  const hasCtrl: boolean = hotkeys.some((value) => value === 'ctrl' || value === '⌘');
  const hasAlt: boolean = hotkeys.some((value) => value === 'alt' || value === '⌥');
  const hasShift: boolean = hotkeys.some((value) => value === 'shift' || value === '⇧');
  return (
    key.toLocaleLowerCase() === event.key.toLocaleLowerCase() &&
    ((hasCtrl && isTouchCtrlKey(event)) || (!hasCtrl && !isTouchCtrlKey(event))) &&
    ((hasAlt && event.altKey) || (!hasAlt && !event.altKey)) &&
    ((hasShift && event.shiftKey) || (!hasShift && !event.shiftKey))
  );
}
