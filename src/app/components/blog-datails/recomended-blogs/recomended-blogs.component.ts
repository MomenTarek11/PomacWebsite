import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recomended-blogs',
  templateUrl: './recomended-blogs.component.html',
  styleUrls: ['./recomended-blogs.component.scss'],
})
export class RecomendedBlogsComponent implements AfterViewInit, OnInit {
  @Input({ required: true }) blogId: any;
  @Input({ required: true }) isMobile: any;
  @Output() thereIsRecomendedBlogs = new EventEmitter<boolean>();
  showPlaceHolder: boolean = false;
  recomendedBlogs: any[] = [];
  // baseURL = 'https://backend-beta-dev.pomac.info/public';
  baseURL = environment.baseURL;
  constructor(private service: AppService, private router: Router) {}
  ngAfterViewInit(): void {
    console.log(this.isMobile, 'shrouuuukl');
  }
  onError(event: any) {
    event.target.src = 'assets/No-Image-Placeholder.svg';
  }
  router_details(item: any) {
    // Prefer meta_title, fallback to title
    const sourceTitle = item.meta_title?.trim() || item.title?.trim();
    if (!sourceTitle) return;

    // Generate slug
    const slug = sourceTitle
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, '') // keeps Arabic characters
      .replace(/\s+/g, '-') // spaces to dashes
      .replace(/-+/g, '-'); // collapse repeated dashes

    this.router.navigate(['blog', slug]);
    this.getRecomendedBlogs(item?.slug);
  }
  ngOnInit() {
    this.getRecomendedBlogs(this.blogId);
  }
  getRecomendedBlogs(BlogId?: any) {
    this.showPlaceHolder = true;
    this.service.recommendedProjects(this.blogId).subscribe((res: any) => {
      this.recomendedBlogs = res?.data || [];
      const hasRecommendations = this.recomendedBlogs.length > 0;
      this.thereIsRecomendedBlogs.emit(hasRecommendations);
      this.showPlaceHolder = false;
      // console.log(this.recomendedBlogs, 'al;dsfjlmdsafk;ad;jf');
    });
  }
}
