import webpack, { Configuration, RuleSetUseItem } from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

function styleLoaderFactory(
  isPro: boolean,
  isModules: boolean,
  isSass: boolean = true
): RuleSetUseItem[] {
  return [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: !isPro,
        reloadAll: true
      }
    },
    {
      loader: 'css-loader',
      options: {
        modules: isModules
      }
    },
    'postcss-loader',
    ...(isSass
      ? [
          'sass-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [path.resolve(__dirname, './src/style/_util.scss')]
            }
          }
        ]
      : [])
  ];
}

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
          use: styleLoaderFactory(isPro, false),
          exclude: /\.modules\.scss$/
        },
        {
          test: /\.modules\.scss$/,
          use: styleLoaderFactory(isPro, true)
        },
        {
          test: /\.css$/,
          use: styleLoaderFactory(isPro, false, false)
        },
        {
          test: /\.(eot|woff2?|ttf|svg)$/,
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
          },
          {
            from: path.resolve(__dirname, './src/lib'),
            to: path.resolve(__dirname, './dist/lib')
          }
        ]
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
      })
    ],
    resolve: {
      extensions: ['.ts', '.js', '.json', '.modules.scss', '.scss'],
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
