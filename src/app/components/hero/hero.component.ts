import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements AfterViewInit, OnInit {
  @ViewChild('heroElement') heroElement!: ElementRef;
  @Output() scroll = new EventEmitter();
  isMobile: boolean = window.innerWidth < 768;
  mobileImage = 'assets/images/home/main-slider/mobileBackground.webp';
  desktopImage = 'assets/images/home/main-slider/desktopBackGround.webp';

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.setBackgroundImage();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth < 768;
    this.setBackgroundImage();
  }
  private setBackgroundImage() {
    const imageUrl = this.isMobile ? this.mobileImage : this.desktopImage;
    this.heroElement.nativeElement.style.backgroundImage = `url('${imageUrl}')`;
    // console.log(this.isMobile, 'dsaf');

    if (this.isMobile == false) {
      this.heroElement.nativeElement.style.backgroundAttachment = 'fixed';
    }
    // console.log(imageUrl);
  }

  openWhatsApp() {
    window.open('https://api.whatsapp.com/send?phone=201094969284', '_blank');
  }

  onScroll() {
    this.scroll.emit();
  }
}
