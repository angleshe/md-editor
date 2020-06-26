import webpack, { Configuration } from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default (env: 'production' | 'development'): Configuration => {
  const isPro: boolean = env === 'production';
  return {
    mode: isPro ? 'production' : 'development',
    entry: {
      index: path.resolve(__dirname, './demo/index.ts')
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].[hash].js',
      publicPath: isPro ? './' : '/'
    },
    cache: true,
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: ['babel-loader', 'ts-loader', 'eslint-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: !isPro,
                reloadAll: true
              }
            },
            'css-loader',
            'postcss-loader',
            'sass-loader',
            {
              loader: 'style-resources-loader',
              options: {
                patterns: [path.resolve(__dirname, './src/style/_util.scss')]
              }
            }
          ]
        },
        {
          test: /\.jpg$/,
          loader: 'url-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './demo/index.html',
        chunks: ['index'],
        hash: true
      }),
      new StyleLintPlugin({
        syntax: 'scss',
        configFile: path.resolve(__dirname, './.stylelintrc.js'),
        files: '**/*.scss'
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './src/public'),
            to: path.resolve(__dirname, './dist/public')
          }
        ]
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css'
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
      extensions: ['.ts', '.js', '.json', 'scss'],
      alias: {
        '@': path.resolve(__dirname, './src'),
        lib: path.resolve(__dirname, './src/lib'),
        public: path.resolve(__dirname, './src/public'),
        res: path.resolve(__dirname, './src/res'),
        script: path.resolve(__dirname, './src/script'),
        style: path.resolve(__dirname, './src/style')
      }
    },
    devServer: {
      hot: true,
      open: true,
      before: (_app, server, compiler): void => {
        compiler.hooks.done.tap('done', () => {
          if (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Object.keys((compiler as any).watchFileSystem.watcher.mtimes).some(
              (name) => path.parse(name).ext === '.html'
            )
          ) {
            server.sockWrite(server.sockets, 'content-changed');
          }
        });
      }
    }
  };
};
