import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChild('projectsContainer') projectsContainer!: ElementRef;
  baseURL = environment.baseURL;
  projects: any[] = [];
  show = false;

  constructor(private service: AppService) {
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });
  }

  ngAfterViewInit(): void {
    this.getAllProjects();
    setTimeout(() => ScrollTrigger.refresh(), 100);
    window.addEventListener('resize', () => ScrollTrigger.refresh());
    // ScrollTrigger.refresh();
  }

  getAllProjects() {
    this.service.homeProjects().subscribe((data: any) => {
      this.show = true;
      this.projects = data?.data;

      setTimeout(() => {
        const cards: any = gsap.utils.toArray('.project-card');
        const container = this.projectsContainer.nativeElement;

        // خلي الكروت فوق بعض
        gsap.set(cards, {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: (i, el, arr) => arr.length - i,
        });
        const isMobile = window.innerWidth < 480; // موبايل
        const containerHeight = cards.length * (isMobile ? 450 : 300);
        gsap.set(container, { height: containerHeight });
        // gsap.set(cards, { force3D: true });
        // ✨ الحالة الابتدائية
        if (cards[0]) {
          gsap.set(cards[0], {
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            opacity: 1,
          });
        }
        if (cards[1]) {
          gsap.set(cards[1], {
            y: isMobile ? 400 : 50, // أكتر في الموبايل
            scale: 0.97,
            filter: 'blur(1px)',
            opacity: 1,
          });
        }
        if (cards[2]) {
          gsap.set(cards[2], {
            y: isMobile ? 450 : 100, // أكتر في الموبايل
            scale: 0.94,
            filter: 'blur(2px)',
            opacity: 1,
          });
        }
        // الباقي يتخفى
        cards.slice(3).forEach((card: any) => gsap.set(card, { opacity: 0 }));

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: '0 top',
            end: '+=400%',
            scrub: 2,

            pin: true,
            pinSpacing: true,
            anticipatePin: 1, // ✨ يمنع القفزة
            invalidateOnRefresh: true,
            // markers: true,
          },
        });
        // ✨ من الأول للتاني
        if (cards[0] && cards[1]) {
          tl.to(cards[0], { y: -600, duration: 1 }, 0);
          tl.to(
            cards[1],
            { y: 0, scale: 1, filter: 'blur(0px)', duration: 1 },
            0
          );
        }
        // ✨ من التاني للتالت
        if (cards[1] && cards[2]) {
          tl.to(cards[1], { y: -700, duration: 1 }, 1);
          tl.to(
            cards[2],
            { y: 0, scale: 1, filter: 'blur(0px)', duration: 1 },
            1
          );
        }

        // ✨ لما يخلص الكارت التالت يظهر الزرار
        tl.to('.show-more-btn', { opacity: 1, ease: 'power2.out' });

        // Refresh on images loaded
        const images =
          document.querySelectorAll<HTMLImageElement>('.project_image');
        let loaded = 0;
        images.forEach((img) => {
          if (img.complete) {
            loaded++;
          } else {
            img.onload = () => {
              loaded++;
              if (loaded === images.length) ScrollTrigger.refresh();
            };
            img.onerror = () => {
              loaded++;
              if (loaded === images.length) ScrollTrigger.refresh();
            };
          }
        });
        if (loaded === images.length) {
          ScrollTrigger.refresh();
        }
      }, 0);
    });
  }
}
