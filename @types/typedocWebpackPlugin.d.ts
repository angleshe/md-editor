declare module 'typedoc-webpack-plugin' {
  // eslint-disable-next-line spaced-comment
  /// <reference types="node"/>
  import { Plugin } from 'webpack';
  interface ITypedocPluginOptions {
    /**
     * @description 输出路径
     * @type {string}
     * @memberof ITypedocPluginOptions
     */
    out?: string;
    name?: string;
    module?: string;
    mode?: string;
    theme?: string;
    target?: string;
    exclude?: string | string[];
    include?: string | string[];
    tsconfig?: string;
    experimentalDecorators?: boolean;
    excludeExternals?: boolean;
    includeDeclarations?: boolean;
    ignoreCompilerErrors?: boolean;
  }

  interface ITypedocPlugin {
    new (options?: ITypedocPluginOptions, path?: string | string[]): Plugin;
  }

  declare const typedocPlugin: ITypedocPlugin;

  export = typedocPlugin;
}
