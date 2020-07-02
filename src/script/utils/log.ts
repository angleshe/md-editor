/**
 * @description 日志打印
 * @author angle
 * @date 2020-07-02
 * @export
 * @param {string} method 方法名
 * @param {string} content 内容
 * @param {string} type 类型
 * @param {boolean} isPrint 是否输出
 */
export function log(method: string, content: string, type: string, isPrint: boolean): void {
  if (isPrint) {
    console.log(`${method} - ${type}: ${content}`);
  }
}
