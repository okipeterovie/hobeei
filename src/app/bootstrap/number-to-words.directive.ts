import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NumberToWord } from '../../services/NumberToWord';

@Directive({
  selector: '[numberToWords]'
})
export class NumberToWordsDirective {

  @Input() numberToWords: string = "";
  @Input() currency: string = "Naira";
  @Input() decimalCurrency: string = "Kobo";

  constructor(private el: ElementRef) {

  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event: any) {
    let n = new NumberToWord();
    n.currency = this.currency;
    n.decimalCurrency = this.decimalCurrency;
    let words = n.toWords(event.target.value);
    this.output(words);
  }

  output(words: any) {
    if (this.numberToWords) {
      let element: HTMLElement = document.getElementById(this.numberToWords) as HTMLElement;
      element.innerHTML = words;
    }
    else {
      console.log(words);
    }
  }


}
