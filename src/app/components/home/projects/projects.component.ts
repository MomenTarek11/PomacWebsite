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

  constructor(private service: AppService) {}

  ngAfterViewInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this.service.homeProjects().subscribe((data: any) => {
      this.show = true;
      this.projects = data?.data;

      setTimeout(() => {
        const cards = gsap.utils.toArray('.project-card');
        const scrollDistance = this.projects.length * 50;
        gsap.set(cards, {
          zIndex: (i, target, targets) => targets.length - i,
        });

        gsap.to(cards.slice(0, -1), {
          yPercent: -150,
          opacity: 0.5,
          ease: 'none',
          stagger: 0.5,
          scrollTrigger: {
            trigger: this.projectsContainer.nativeElement,
            start: 'top top+=200',
            end: `+=${scrollDistance}%`,
            scrub: true,
            pin: true,

            markers: true,
          },
        });
      });
    });
  }
}
