import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  constructor() {}
  openWhatsApp() {
    window.open('https://api.whatsapp.com/send?phone=201094969284', '_blank');
  }
}
