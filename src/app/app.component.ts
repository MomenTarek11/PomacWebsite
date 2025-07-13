import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as AOS from 'aos';
import { environment } from 'src/environments/environment';
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
    private elementRef: ElementRef,
    private router: Router
  ) {
    this.switchLanguage('ar');
    translate.setDefaultLang('ar');
  }
  ngOnInit(): void {
    // AOS animation init
    AOS.init({ once: true });
    if (window.location.pathname === '') {
      this.router.navigate(['/home']);
    }
    // Check user tracking preference
    const accepted = localStorage.getItem('trackingAccepted');
    if (accepted === 'true') {
      this.trackingAccepted = true;
      this.pushTrackingEvent();
    } else if (accepted === 'false') {
      this.trackingAccepted = true;
    }
    // Mobile checker
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile.bind(this));

    // Version Check
    const currentVersion = environment.appVersion;
    const savedVersion = localStorage.getItem('appVersion');

    if (savedVersion && savedVersion !== currentVersion) {
      console.log('🔄 New version detected. Reloading...');

      // Save new version
      localStorage.setItem('appVersion', currentVersion);
      
      // Optional: clear service worker and caches
      if ('caches' in window) {
        caches.keys().then((names) => {
          for (let name of names) caches.delete(name);
        });
      }

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((regs) => {
          for (let reg of regs) reg.unregister();
        });
      }

      // Force reload once
      location.reload();
    } else if (!savedVersion) {
      // First time user
      localStorage.setItem('appVersion', currentVersion);
      console.log('🎉 First time user!');
    }
  }

  acceptTracking() {
    localStorage.setItem('trackingAccepted', 'true');
    this.trackingAccepted = true;
    if (typeof window.deferGTM === 'function') {
      window.deferGTM();
    }
    this.pushTrackingEvent();
  }

  rejectTracking() {
    localStorage.setItem('trackingAccepted', 'false');
    this.trackingAccepted = true;

    // ❌ بدون تفعيل أي تتبع
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
    this.isMobile = window.innerWidth <= 1024;
    if (this.isMobile) {
      this.showWhats = false;
    }
  };
}
