import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
declare global {
  interface Window {
    deferGTM?: () => void;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showWhats: boolean = true;
  title = 'pomac-new';
  is_opened = false;
  text: string = '';
  url: string = '';
  trackingAccepted = false;
  isMobile: boolean = false;
  constructor(
    public translate: TranslateService,
    private elementRef: ElementRef
  ) {
    this.switchLanguage('ar');
    translate.setDefaultLang('ar');
  }
  ngOnInit(): void {
    const accepted = localStorage.getItem('trackingAccepted');
    if (accepted === 'true') {
      this.trackingAccepted = true;
      this.pushTrackingEvent(); // لو كان وافق قبل كده
    }
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  }
  acceptTracking() {
    localStorage.setItem('trackingAccepted', 'true');
    this.trackingAccepted = true;

    // 👇 تشغيل Google Tag Manager
    if (typeof window.deferGTM === 'function') {
      window.deferGTM();
    }

    this.pushTrackingEvent(); // إرسال حدث التتبع
  }

  pushTrackingEvent() {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'allowTracking',
    });
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Check if click is outside the WhatsApp component
    const whatsappElement =
      this.elementRef.nativeElement.querySelector('.whatsapp');
    const waButton =
      this.elementRef.nativeElement.querySelector('.container-wa a');

    if (whatsappElement && !whatsappElement.contains(event.target)) {
      // Also make sure we're not clicking the WhatsApp button itself
      if (!waButton?.contains(event.target)) {
        this.showWhats = false;
      }
    }
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    if (language !== 'ar' && document.documentElement.hasAttribute('dir')) {
      document.documentElement.removeAttribute('dir');
    } else if (
      language === 'ar' &&
      !document.documentElement.hasAttribute('dir')
    ) {
      document.documentElement.setAttribute('dir', 'rtl');
    }
    localStorage.setItem('lang', language);
  }

  sendDirect() {
    this.url = `https://api.whatsapp.com/send?phone=201094969284`;
    window.open(this.url, '_blank');
    this.showWhats = false;
  }

  toggleWhatsapp(event?: MouseEvent) {
    event?.stopPropagation(); // prevent bubbling

    if (this.isMobile == true) {
      console.log('mobile');
      this.sendDirect(); // open WhatsApp directly
      return;
    }

    this.showWhats = !this.showWhats;
  }
  ngOnDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  }

  checkMobile = () => {
    this.isMobile = window.innerWidth <= 768;
  };
}
