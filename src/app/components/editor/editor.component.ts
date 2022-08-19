import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { registerPlainText } from '@lexical/plain-text';
import { createEditor, LexicalEditor } from 'lexical';

@Component({
  selector: 'lex-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit {
  @ViewChild('editor')
  private editableElement: ElementRef<HTMLElement | null>

  private editor: LexicalEditor

  ngOnInit() {
    this.editor = createEditor();
  }

  ngAfterViewInit() {
    this.editor.setRootElement(this.editableElement.nativeElement);
    registerPlainText(this.editor);
  }

}
