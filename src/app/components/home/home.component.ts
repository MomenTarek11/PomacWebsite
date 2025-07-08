import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { hexToRgb } from 'src/app/helper/hex-to-rgb';
import { environment } from 'src/environments/environment';
declare var require: any;
declare var AOS: any;
// import * as $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { NgxTypedJsComponent } from 'ngx-typed-js';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
var services = require('src/app/data/services.json');
var projects = require('src/app/data/projects.json');

// var testimonials = require('src/app/data/testimonials.json');
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  section_count = 3;
  show: boolean = false;
  public home;
  public services;
  typedStarted = false;
  typedIndex = 0;
  public projects;
  public testimonials: any = [];
  public sliderText = ['Attractive', 'Usable', 'Pretty'];
  public sliderTextArabic = [
    ' سهلة الاستخدام',
    '  قابلة للتطوير ',
    'عالية الجودة',
  ];
  public baseURL = environment.baseURL;
  home_data = {
    ques_en: 'Do you have an',
    idea_en: 'idea',
    mark_en: '?',
    talk_en: "Let's Talk.",
    contact_en: 'Contact us',
    ques_ar: 'هل لديك أي',
    idea_ar: 'أفكار',
    mark_ar: '؟',
    talk_ar: 'هيا أخبرنا بها.',
    contact_ar: 'تواصل معنا',
  };

  @ViewChild(NgxTypedJsComponent) typed: NgxTypedJsComponent;
  // typedIndex = 0;
  dir: any;
  sections: any = [];
  doSmth(index) {
    this.typedIndex = index;
    // console.log(index)
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AppService,
    public translate: TranslateService,
    private spinner: NgxSpinnerService
  ) {
    if (translate.currentLang == 'ar') {
      this.sliderText = this.sliderTextArabic;
    }
    this.service.getScroll().subscribe((data: any) => {
      if (data) {
        // get route name
        let routeName = this.router.url.split('/')[1];
        if (routeName == 'home') {
          try {
            this.scrollTo(data);
          } catch (error) {}
        } else {
          this.router.navigate(['/home']);
          setTimeout(() => {
            this.scrollTo(data);
          }, 1000);
        }
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.dir = params['dir'];
    });
    if (this.dir) {
      // this.scrollToService()
      document.getElementById('goToService').click();
      // alert('donee')
    }
    // console.log(document.referrer.split('/')[3] , 'tessst');

    // console.log(this.owlCar)
    // console.log(this.owlCar)
    // console.log(this.owlCar)
    // console.log(this.owlCar)
    //   $(document).ready(function() {
    //     var inner = $(".inner");
    //     var elementPosTop = inner.position().top;
    //     var viewportHeight = $(window).height();
    //     $(window).on('scroll', function() {
    //       var scrollPos = $(window).scrollTop();
    //       var elementFromTop = elementPosTop - scrollPos;
    //         if (elementFromTop > 0 && elementFromTop < elementPosTop + viewportHeight) {
    //             inner.addClass("active");
    //             $("#video_player").prop("controls",true);

    //         } else {
    //           $("#video_player").prop("controls",false);

    //             $('#video_player').trigger('play');

    //         }
    //     });
    // })

    AOS.init();
    // this.services = services;
    // this.projects = projects;
    // this.testimonials  =  [];
    // this.testimonials = testimonials;
    this.getTestimonials();
    // this.getTestimonials()
    // نأخر الأنيميشن البسيط عشان نحسن LCP
    setTimeout(() => {
      this.typedStarted = true;
    }, 200); // تقدر تزود حسب تجربتك
  }
  public testimonial_slidder: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };
  hexToRgb(color, opacity) {
    return hexToRgb(color, opacity);
  }

  // custom owl-carousel-o slider
  testimonialsStartPosition: number = 0;
  mainSlidersStartPosition = 0;
  @ViewChild('testimonialsSlider') testimonialsSliderOwlCarousel;
  @ViewChild('homeMainSlider') homeMainSliderOwlCarousel;
  jumpTo(index: number, sliderName) {
    switch (sliderName) {
      case 'testimonials':
        this.testimonialsStartPosition = index;
        this.testimonialsSliderOwlCarousel.to(index.toString());
        break;
      default:
        this.mainSlidersStartPosition = index;
        this.homeMainSliderOwlCarousel.to(index.toString());
        break;
    }
  }
  isDragging(e, sliderName) {
    switch (sliderName) {
      case 'testimonials':
        this.testimonialsStartPosition = e.startPosition;
        break;
      default:
        this.mainSlidersStartPosition = e.startPosition;
        break;
    }
  }
  main_slidder: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    slideTransition: 'linear',
    smartSpeed: 500,
    navText: ['', ''],
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
    },
  };
  projects333Options: OwlOptions = {
    rtl: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    center: true,
    autoplay: true,

    slideTransition: 'ease-in-out',
    smartSpeed: 1000,

    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 2,
      },
      1200: {
        items: 2,
      },
      1400: {
        items: 2,
      },
      1600: {
        items: 2,
      },
      1800: {
        items: 2,
      },
    },
  };
  newprojectsOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
  };
  // servesss
  getTestimonials() {
    this.spinner.show();

    this.service
      .home()
      .pipe(map((res) => res['data']))
      .subscribe((home) => {
        this.show = true;
        this.home = home;
        console.log(home, 'ssssssaafffffff');

        this.home?.faqs.forEach((element: any) => {
          return (element.show = false);
        });
        this.home.faqs = this.home?.faqs.slice(0, 5);
        this.sections = this.home?.sections.slice(0, this.section_count);
        this.spinner.hide();
      });

    // this.service.testimonials().pipe(map(res=>res['data'])).subscribe(testimonials=>{
    //   this.testimonials = testimonials
    // })
  }
  addsections() {
    this.section_count = this.home?.sections.length;
    this.sections = this.home?.sections.slice(0, this.section_count);
  }
  //
  goToProject(event, project) {
    console.log(event, project);
    /*
     * 	 path => import { Router } from '@angular/router';
     * 	 param =>
     */
    this.router.navigate(['/our-work', project.id, project.name_EN]);
    // console.log(type)
    // console.log(project , type)
  }
  scrollTo(className: string): void {
    const elementList = document.querySelectorAll('.' + className);
    const element = elementList[0] as HTMLElement;

    let dims = element.getBoundingClientRect();
    console.log(className);
    // window.scrollTo(window.scrollX, dims.top - 190);

    element.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToService() {
    // alert('done')
    setTimeout(() => {
      document.getElementById('Services')?.scrollIntoView();
    }, 1000);
  }
  toggl(item: any) {
    console.log(item.show, item);
    if (item.show == true) {
      item.show = !item.show;
      this.home?.faqs.forEach((element: any) => {
        return (element.show = false);
      });
    } else {
      this.home?.faqs.forEach((element: any) => {
        return (element.show = false);
      });
      setTimeout(() => {
        item.show = true;
      }, 0);
    }
  }
}
