import * as AOS from 'aos';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';
import { Meta, Title } from '@angular/platform-browser';
declare var AOS: any;

@Component({
  selector: 'app-blog-datails',
  templateUrl: './blog-datails.component.html',
  styleUrls: ['./blog-datails.component.scss'],
})
export class BlogDatailsComponent implements OnInit, OnChanges, AfterViewInit {
  // baseURL = 'https://backend-beta-dev.pomac.info/public';
  @ViewChild('contentCol') contentCol!: ElementRef;
  @ViewChild('sidebarCol') sidebarCol!: ElementRef;
  baseURL = environment.baseURL;
  id: any;
  show = false;
  blog_details: any;
  blogs: any[] = [];
  showRecommendedBlogs = true; // Default true (show)
  @ViewChild('blogContent') blogContent!: ElementRef;
  isMobile = window.innerWidth < 768;
  // @Input() blog_details: any;
  constructor(
    private route: ActivatedRoute,
    private blog: AppService,
    private router: Router,
    private meta: Meta,
    private title: Title
  ) {}
  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  ngOnInit(): void {
    AOS.init();
    this.route.params.subscribe((params) => {
      console.log(params);
      const slug = params.blog_id;
      this.getProjectBySlug(params?.blog_id);
    });
  }

  ngAfterViewInit() {
    this.processImages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['blog_details'] && this.blog_details?.content) {
      // Delay to wait DOM render
      setTimeout(() => this.processImages(), 0);
    }
  }

  processImages() {
    if (!this.blogContent) return;
    const container = this.blogContent.nativeElement;
    const images = container.querySelectorAll('p img');
    const paragraphs = container.querySelectorAll('p');

    images.forEach((img: HTMLImageElement) => {
      // Basic styling
      if (!this.isMobile) {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
      } else {
        img.style.width = '100%';
      }
      img.style.height = 'auto';
      img.style.objectFit = 'cover';

      // Optional enhancements
      img.setAttribute('loading', 'lazy');
      img.style.borderRadius = '12px';
      img.style.display = 'block';
      img.style.margin = '10px auto';

      // ❌ Disable right-click
      img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
    });

    paragraphs.forEach((p: HTMLParagraphElement) => {
      p.style.textAlign = 'right';
      p.style.fontSize = '18px';
    });
  }

  getProjectBySlug(slug) {
    this.showRecommendedBlogs = false;
    this.show = false;
    this.blog
      .blog_details(slug)
      .pipe(map((res) => res['data']))
      .subscribe((project) => {
        // this.blog_details = project;
        this.blog_details = project;
        this.show = true;
        console.log(this.blog_details, 'momen');
        this.showRecommendedBlogs = true;
        this.id = this.blog_details.id;
        console.log(this.id, 'erhmona b2a');

        // ✅ wait DOM update then process images
        setTimeout(() => this.processImages(), 0);
        setTimeout(() => {
          if (
            this.contentCol?.nativeElement &&
            this.sidebarCol?.nativeElement
          ) {
            const contentHeight = this.contentCol.nativeElement.offsetHeight;
            this.sidebarCol.nativeElement.style.height = contentHeight + 'px';
          } else {
            console.warn('Sidebar or Content element not found yet.');
          }
        }, 100);
      });
    this.blog.blog_details(slug).subscribe((project: any) => {
      console.log(project);

      this.title.setTitle(project.title);
      this.meta.updateTag({ name: 'description', content: project.summary });
      this.meta.updateTag({ property: 'og:title', content: project.title });
      this.meta.updateTag({
        property: 'og:description',
        content: project.summary,
      });
      this.meta.updateTag({ property: 'og:image', content: project.image });
      this.meta.updateTag({
        property: 'og:url',
        content: window.location.href,
      });
    });
  }
  // getallProject() {
  //   // this.show = false;
  //   this.blog
  //     .recommendedProjects(this.id)
  //     .pipe(map((res) => res['data']))
  //     .subscribe((projects) => {
  //       // console.log(projects);
  //       this.blogs = projects?.slice(0, 3); // projects?.data;
  //       this.show = true;
  //       // console.log(projects);
  //     });
  // }
  onError(event: any) {
    event.target.src = 'assets/No-Image-Placeholder.svg';
  }
  onErrorSvg(event: any) {
    event.target.src =
      'assets/images/error-placeholder-image-2e1q6z01rfep95v0.svg';
  }
  handleRecomendedStatus(hasRecommendations: boolean) {
    this.showRecommendedBlogs = hasRecommendations;
    console.log('Recommended blogs available?', hasRecommendations);
  }
  openWhatsApp() {
    window.open('https://api.whatsapp.com/send?phone=201094969284', '_blank');
  }
}
