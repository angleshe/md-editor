/**
 * @description 加载js文件
 * @author angle
 * @date 2020-06-27
 * @export
 * @param {string} path 文件路径
 * @param {string} id
 * @returns {Promise<void>}
 */
export function addScript(path: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
    } else {
      const scriptElement: HTMLScriptElement = document.createElement<'script'>('script');
      scriptElement.src = path;
      scriptElement.async = true;
      scriptElement.onerror = (err): void => {
        reject(err);
      };
      scriptElement.onload = (): void => {
        if (document.getElementById(id)) {
          scriptElement.remove();
        } else {
          scriptElement.id = id;
        }
        resolve();
      };
      document.head.appendChild(scriptElement);
    }
  });
}
