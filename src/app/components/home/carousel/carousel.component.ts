import { AfterViewInit, Component, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @ViewChild('techSwiper') techSwiper!: SwiperComponent;
  components: any[] = [
    {
      id: 1,
      title: 'تطوير البرمجيات',
      desc: 'نعمل مع رواد الأعمال في تنفيذ برمجيات متخصصة تلبي احتياجات مختلف قطاعات الأعمال، لخلق مزيد من الشركات يحتاجها السوق',
      image: 'assets/images/home/carousel/1.webp',
    },
    {
      id: 2,
      title: 'الذكاء الاصطناعي وتعلم الآلة',
      desc: 'تطبيقات الذكاء الاصطناعي في مختلف الصناعات، التحليل البياني، وحلول الأتمتة.',
      image: 'assets/images/home/carousel/2.webp',
    },
    {
      id: 3,
      title: 'التنقل والخدمات اللوجستية',
      desc: 'حلول التنقل الذكي، التوصيل السريع، وإدارة سلاسل التوريد.',
      image: 'assets/images/home/carousel/3.webp',
    },
    {
      id: 4,
      title: 'التقنية العقارية (PropTech)',
      desc: 'نعمل مع رواد الأعمال في تنفيذ البرمجيات العقارية مثل إدارة العقارات الذكية، التقنية العقارية المالية ، التسويق الرقمي للعقارات',
      image: 'assets/images/home/carousel/4.webp',
    },
    {
      id: 5,
      title: 'التكنولوجيا المالية (Fintech)',
      desc: 'نعمل مع رواد الأعمال في برمجيات حلول الدفع الإلكتروني، التكنولوجيا المصرفية، والخدمات المالية الرقمية ، منصات التمويل الجماعي',
      image: 'assets/images/home/carousel/5.webp',
    },
    {
      id: 6,
      title: 'التجارة الإلكترونية',
      desc: 'منصات البيع عبر الإنترنت، تطبيقات التسوق، وحلول الدفع عبر الإنترنت.',
      image: 'assets/images/home/carousel/6.webp',
    },
    {
      id: 7,
      title: 'التقنية التعليمية (Edutech)',
      desc: 'نعمل مع رواد الأعمال في برمجيات منصات التعليم عبر الإنترنت، والخدمة التعليمية عبر البرمجيات ، البرمجيات التعليمية كخدمة',
      image: 'assets/images/home/carousel/7.webp',
    },
    {
      id: 8,
      title: 'الأمن السيبراني',
      desc: 'الشركات التي تقدم حلول لحماية البيانات، الأمن الإلكتروني، وحماية الشبكات.',
      image: 'assets/images/home/carousel/8.webp',
    },
    {
      id: 9,
      title: 'الصحة التقنية',
      desc: 'الرعاية الصحية عن بعد، التطبيقات الصحية، والأجهزة الطبية الذكية.',
      image: 'assets/images/home/carousel/9.webp',
    },
  ];
  slideNext() {
    this.techSwiper.swiperRef.slideNext();
  }

  slidePrev() {
    this.techSwiper.swiperRef.slidePrev();
  }
}
