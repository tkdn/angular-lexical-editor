import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { registerPlainText } from '@lexical/plain-text';
import { createEditor, LexicalEditor } from 'lexical';

const initialEditorState = JSON.stringify({
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '最初の状態',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
});

@Component({
  selector: 'lex-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit, AfterViewInit {
  @ViewChild('editor')
  private editableElement: ElementRef<HTMLElement | null>;

  private editor: LexicalEditor;

  ngOnInit() {
    this.editor = createEditor();
    const parsedEditorState = this.editor.parseEditorState(initialEditorState);
    this.editor.setEditorState(parsedEditorState);
  }

  ngAfterViewInit() {
    this.editor.setRootElement(this.editableElement.nativeElement);
    registerPlainText(this.editor);
  }

  onButtonPress() {
    console.log(JSON.stringify(this.editor.getEditorState()));
  }
}
