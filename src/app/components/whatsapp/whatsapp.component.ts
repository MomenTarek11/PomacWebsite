import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss'],
})
export class WhatsappComponent implements OnInit {
  // input showWhats
  @Input() showWhats: boolean = false;
  text: any = '';
  url: any;
  constructor() {}

  ngOnInit(): void {}
  send() {
    if (this.text == undefined) {
      return;
    } else {
      this.text = '';
      this.url = `https://api.whatsapp.com/send?phone=201094969284&text=${this.text}`;
      window.open(this.url, '_blank', '');
    }
  }
}
