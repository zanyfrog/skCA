import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-subheader',
  templateUrl: 'page-subheader.component.html'
})
export class PageSubHeaderComponent {

  @Input() title: string;

  constructor( ) {
  }

}
