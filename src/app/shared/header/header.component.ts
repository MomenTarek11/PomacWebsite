import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
// import { on } from 'events';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // view child toggle
  @ViewChild('toggle') toggle: ElementRef;
  showMenu = false;
  route = 'mainSlider';
  public routes = [
    { text: 'Home', path: '/home' },
    { text: 'About', path: '/about' },
    // { text:'Our Work', path:'/our-work' },
  ];
  onHomePage: boolean = true;
  isScrolled: boolean = false;
  routerPage: any;
  url: string;
  onBlogDetailsPage: boolean = false;
  isDesktop: boolean = false;
  showButton: boolean = false;
  constructor(
    public translate: TranslateService,
    private router: Router,
    private service: AppService,

    private spinner: NgxSpinnerService
  ) {
    // this.switchLanguage('ar')
    console.log(this.onHomePage, 'haram');
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        var url = window.location.href;

        var urll = url.split('/');
        this.url = urll[3];
      });

    this.service.getScroll().subscribe((data) => {
      if (data) {
        console.log(data);
        // this.route = data
        let routeName = this.router.url.split('/')[1];
        if (routeName == 'home') {
          try {
            this.scrollToClassName(data);
          } catch (error) {}
        } else {
          this.router.navigate(['/home']);
          setTimeout(() => {
            this.scrollToClassName(data);
          }, 1000);
        }
      }
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects || event.url;
        this.onHomePage =
          url === '/home' || url === '/home#' || url.startsWith('/blog/');
        this.onBlogDetailsPage = url.startsWith('/blog/');
        const urll = window.location.href.split('/');
        this.url = urll[3];
        console.log('onHomePage:', this.onHomePage);
        console.log('onBlogDetailsPage:', this.onBlogDetailsPage);
      });
  }
  ngOnInit(): void {
    // this.toggleBtn();
    console.log('momen', this.onBlogDetailsPage);
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }
  checkScreenSize() {
    this.isDesktop = window.innerWidth > 1024;
    this.showButton = window.innerWidth > 1400;
  }
  toggleBtn() {
    // this.toggle
    // alert('toggleBtn')
    const toggle = document.querySelector('.toggle');
    const toggleBtn = document.querySelector('.toggle-btn');
    const menu = document.querySelector('.menu');
    const menuList = document.querySelector('.menu-list');
    const menuItems = document.querySelectorAll('.menu-item');
    let showMenu = false;
    menuItems.forEach((e: any) => {
      e.addEventListener('click', toggleMenu);
      console.log(showMenu);
      function toggleMenu() {
        toggleBtn.classList.remove('open');
        menu.classList.remove('open');
        menuList.classList.remove('open');
        menuItems.forEach((item) => item.classList.remove('open'));
        showMenu = false;
      }
      toggleBtn.classList.remove('open');
    });
    toggle.addEventListener('click', toggleMenu);
    console.log(showMenu);
    function toggleMenu() {
      if (!showMenu) {
        toggleBtn.classList.add('open');
        menu.classList.add('open');
        menuList.classList.add('open');
        menuItems.forEach((item) => item.classList.add('open'));
        showMenu = true;
      } else {
        toggleBtn.classList.remove('open');
        menu.classList.remove('open');
        menuList.classList.remove('open');
        menuItems.forEach((item) => item.classList.remove('open'));
        showMenu = false;
      }
    }
  }
  switchLanguage(language: string) {
    this.spinner.show();
    this.translate.use(language);
    if (
      language !== 'ar' &&
      document.getElementsByTagName('html')[0].hasAttribute('dir')
    ) {
      document.getElementsByTagName('html')[0].removeAttribute('dir');
    } else if (
      language === 'ar' &&
      !document.getElementsByTagName('html')[0].hasAttribute('dir')
    ) {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    }
    localStorage.setItem('lang', language);
    // this.spinner.hide()
    // window scroll to top
    // window.scroll({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth'
    // });
    window.location.reload();
  }
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollY = window.scrollY || window.pageYOffset;
    const headerSelector = this.isDesktop
      ? '.desktop-header'
      : '.mobile-header';
    const header = document.querySelector(headerSelector);
    if (header && scrollY > header.clientHeight && this.showMenu) {
      console.log('Closing menu due to scroll on', headerSelector);
      this.closeMenu();
    }
    // this.isScrolled = scrollY >= 80;
    if (this.router.url === '/home') {
      this.onHomePage = scrollY <= 270;
    }
    if (this.router.url.startsWith('/blog/')) {
      this.onHomePage = scrollY <= 90;
    }
  }

  scrollToClassName(className: string) {
    // this.route = className
    // this.service.setScroll(className)
    this.router.navigate([], { fragment: className });
  }

  goToHome() {
    let dir = location.pathname.split('/');
    console.log(dir[1]);

    if (dir[1] == 'our-work') {
      this.router.navigate(['/home'], {
        queryParams: {
          dir: 'service',
        },
      });
    } else if (dir[1] == 'project-details') {
      this.router.navigate(['/home'], {
        queryParams: {
          dir: 'service',
        },
      });
    } else {
      document.getElementById('Services')?.scrollIntoView();
    }
  }
  // showMenu = false;

  Toggle() {
    this.showMenu = !this.showMenu;
  }

  closeMenu() {
    this.showMenu = false;
  }
}
