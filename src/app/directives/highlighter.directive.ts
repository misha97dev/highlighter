import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlighter]',
})
export class HighlighterDirective implements OnChanges {
  @Input('appHighlighter') searchText!: string;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.searchText && changes['searchText']) {
      this.highlightText();
    } else {
      this.removeHighlighter();
    }
  }
  private highlightText() {
    const wordsFromInput = this.searchText.trim().split(/\s+/);
    const wordsFiltered = wordsFromInput.map((word) =>
      this.removeRegexChar(word)
    );
    const resultWords = new RegExp(`(${wordsFiltered.join('|')})`, 'gi');
    const text = this.el.nativeElement.innerText;
    const resultText = text.replace(
      resultWords,
      (match: any) => `<span class="highlighted">${match}</span>`
    );
    if (resultText.length === 0) return;
    this.el.nativeElement.innerHTML = resultText;
  }
  private removeHighlighter() {
    const text = this.el.nativeElement.querySelectorAll('.highlighted');
    text.forEach((span: HTMLElement) => {
      const content = document.createTextNode(span.innerText);
      span.parentNode?.replaceChild(content, span);
    });
  }

  private removeRegexChar(text: string): string {
    return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }
}
