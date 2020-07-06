import { IEditor } from '../../index';
import style from 'style/editor.modules.scss';
import reset from 'style/reset.modules.scss';

export function initUi(editor: IEditor): void {
  editor.element.classList.add(reset.reset);
  editor.element.classList.add(style.editor);
  editor.element.style.height = editor.options.height as string;
  editor.element.style.minHeight = editor.options.minHeight as string;
}
