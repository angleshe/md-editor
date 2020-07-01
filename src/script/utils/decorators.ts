/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @description 自动绑定this
 * @author angle
 * @date 2020-06-27
 * @export
 * @param {Record<string, any>} target
 * @param {string} propertyKey
 * @param {TypedPropertyDescriptor<(...arg: any[]) => any>} descriptor
 * @returns {TypedPropertyDescriptor<(...arg: any[]) => any>}
 */
export default function autoBind(
  target: Record<string, any>,
  propertyKey: string,
  { configurable, enumerable, value: fn }: TypedPropertyDescriptor<(...arg: any[]) => any>
): TypedPropertyDescriptor<(...arg: any[]) => any> {
  return {
    configurable,
    enumerable,
    get(): (...arg: any[]) => any {
      if (!fn) {
        throw new Error('函数不得为空');
      }
      return fn.bind(this);
    }
  };
}
