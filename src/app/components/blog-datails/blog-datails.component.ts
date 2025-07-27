import * as AOS from 'aos';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';
declare var AOS: any;
@Component({
  selector: 'app-blog-datails',
  templateUrl: './blog-datails.component.html',
  styleUrls: ['./blog-datails.component.scss'],
})
export class BlogDatailsComponent implements OnInit, OnChanges, AfterViewInit {
  baseURL = 'https://backend-beta-dev.pomac.info/public';
  id = '';
  show = false;
  blog_details: any;
  blogs: any[] = [];
  showRecommendedBlogs = true; // Default true (show)
  @ViewChild('blogContent') blogContent!: ElementRef;
  // @Input() blog_details: any;
  constructor(
    private route: ActivatedRoute,
    private blog: AppService,
    private router: Router
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state;
    console.log('Passed state:', state);
  }

  ngOnInit(): void {
    AOS.init();
    this.route.params.subscribe((params) => {
      const number = params['blog_id']?.match(/\d+/);
      this.id = number ? number[0] : '';
      this.getProjects();
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
    images.forEach((img: HTMLImageElement) => {
      // Basic styling
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.classList.add('img-fluid'); // Bootstrap responsive

      // Optional enhancements
      img.setAttribute('loading', 'lazy');
      img.style.borderRadius = '12px';
      img.style.display = 'block';
      img.style.margin = '10px auto';
    });
  }
  getProjects() {
    this.blog
      .blog_details(this.id)
      .pipe(map((res) => res['data']))
      .subscribe((project) => {
        this.blog_details = project;
        this.show = true;

        // ✅ wait DOM update then process images
        setTimeout(() => this.processImages(), 0);
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
}
