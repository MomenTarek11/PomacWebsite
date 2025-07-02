import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/app.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // view child toggle
  @ViewChild('toggle') toggle: ElementRef;
  showMenu = false;
  route = 'mainSlider';
  public routes = [
    { text:'Home', path:'/home' },
    { text:'About', path:'/about' },
    // { text:'Our Work', path:'/our-work' },
  ]
  isScrolled: boolean=false;
  routerPage: any;
  url: string;

  constructor(public translate: TranslateService,private router: Router,private service:AppService,

    private spinner:NgxSpinnerService
    ) {

      // this.switchLanguage('ar')
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      var url = window.location.href;

      var urll = url.split( '/' );
      this.url=urll[3]
    })

    this.service.getScroll().subscribe(data=>{
    if(data){
      console.log(data)
      // this.route = data
      let routeName = this.router.url.split('/')[1]
      if(routeName == 'home'){
        try {
          this.scrollToClassName(data)

          } catch (error) {

          }
      }else{
        this.router.navigate(['/home'])
        setTimeout(() => {
          this.scrollToClassName(data)
        }, 1000);
      }
    }

    })
  }

  ngOnInit(): void {
    this.toggleBtn();

  }
  toggleBtn(){

    // this.toggle

    // alert('toggleBtn')
    const toggle = document.querySelector(".toggle");
    const toggleBtn = document.querySelector(".toggle-btn");
    const menu = document.querySelector(".menu");
    const menuList = document.querySelector(".menu-list");
    const menuItems = document.querySelectorAll(".menu-item");

    let showMenu = false;
    menuItems.forEach((e:any)=>{
      e.addEventListener("click", toggleMenu);
      console.log(showMenu)
      function toggleMenu() {

          toggleBtn.classList.remove("open");
          menu.classList.remove("open");
          menuList.classList.remove("open");
          menuItems.forEach(item => item.classList.remove("open"));
          showMenu = false;

        }
        toggleBtn.classList.remove("open");
    })
    toggle.addEventListener("click", toggleMenu);
    console.log(showMenu)
    function toggleMenu() {
      if (!showMenu) {
        toggleBtn.classList.add("open");
        menu.classList.add("open");
        menuList.classList.add("open");
        menuItems.forEach(item => item.classList.add("open"));
        showMenu = true;
      } else {
        toggleBtn.classList.remove("open");
        menu.classList.remove("open");
        menuList.classList.remove("open");
        menuItems.forEach(item => item.classList.remove("open"));
        showMenu = false;
      }
    }
  }
  togglef(){
    // this.showMenu = !this.showMenu
    this.showMenu = !this.showMenu
    // toggle menu add click event
    if(this.showMenu){
      // this.toggle.nativeElement.classList.add('open')
    }else{
      // this.toggle.nativeElement.classList.remove('open')
    }

    // this.toggle.nativeElement.addEventListener('click', this.togglef)

  }
  switchLanguage(language: string) {
    this.spinner.show()
    this.translate.use(language);
    if (language !== 'ar' && document.getElementsByTagName('html')[0].hasAttribute('dir')) {
      document.getElementsByTagName('html')[0].removeAttribute('dir');
    } else if (language === 'ar' && !document.getElementsByTagName('html')[0].hasAttribute('dir')) {
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
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    // this.toggleBtn()

    // document.getElementById('toggle').click()
    let element = document.querySelector('header');
    if (window.pageYOffset > element.clientHeight) {

      // this.route = null
      // this.router.navigate([], { fragment: null });
      // set timeout to remove last fragment
      // setTimeout(() => {
      //   this.router.navigate([], { fragment: null });
      // }, 1000);

    //   setTimeout(function(){
    //     // history.replaceState("", document.title, window.location.pathname);
    //     // angular router remove last fragment


    // }, 1);
      if(this.showMenu){
        // this.togglef()
        this.toggle.nativeElement.click()
        this.showMenu = false
        // window.location.href=window.location.href.slice(0, -1);

      }

      // element.classList.add('sticky');
      // document.body.classList.add('auto-padding')
    } else {
      // element.classList.remove('sticky');
      // document.body.classList.remove('auto-padding')

    }
  }
  scrollToClassName(className: string) {
    // this.route = className
    // this.service.setScroll(className)
    this.router.navigate([], { fragment: className });
  }
  @HostListener("window:scroll")
  scrollEvent() {
      window.pageYOffset >= 80 ? (this.isScrolled = true) : (this.isScrolled = false);
  }

goToHome(){
  let dir = location.pathname.split( '/' );
  console.log(dir[1]);

  if(dir[1] == 'our-work' ){
     this.router.navigate(['/home'],{queryParams:{
    dir:'service'
   }})

  } else if(dir[1] == 'project-details'){
    this.router.navigate(['/home'],{queryParams:{
      dir:'service'
     }})
  }else{
    document.getElementById('Services')?.scrollIntoView()
  }

}

}
