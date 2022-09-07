import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { registerPlainText } from '@lexical/plain-text';
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
  createEditor,
  LexicalEditor,
} from 'lexical';

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
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editor')
  private editableElement: ElementRef<HTMLElement | null>;
  private editor: LexicalEditor;
  private removeUpdateListener: () => void;

  ngOnInit() {
    this.editor = createEditor();
    const parsedEditorState = this.editor.parseEditorState(initialEditorState);
    this.editor.setEditorState(parsedEditorState);

    // listen
    this.removeUpdateListener = this.editor.registerUpdateListener(
      ({ editorState }) => {
        editorState.read(() => {
          // Get the selection from the EditorState
          const selection = $getSelection();
          console.log('Selection is %o', selection);
        });
      }
    );
  }

  ngAfterViewInit() {
    this.editor.setRootElement(this.editableElement.nativeElement);
    registerPlainText(this.editor);
  }

  ngOnDestroy() {
    this.removeUpdateListener();
  }

  logState() {
    console.log(this.editor.getEditorState());
  }

  appendHelloWorld() {
    this.editor.update(() => {
      // Get the RootNode from the EditorState
      const root = $getRoot();
      // Create a new ParagraphNode
      const paragraphNode = $createParagraphNode();
      // Create a new TextNode
      const textNode = $createTextNode('Hello world');

      paragraphNode.append(textNode);
      root.append(paragraphNode);
    });
  }
}
