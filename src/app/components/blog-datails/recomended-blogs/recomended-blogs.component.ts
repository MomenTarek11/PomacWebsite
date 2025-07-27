import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-recomended-blogs',
  templateUrl: './recomended-blogs.component.html',
  styleUrls: ['./recomended-blogs.component.scss'],
})
export class RecomendedBlogsComponent {
  @Input({ required: true }) blogId: any;
  @Output() thereIsRecomendedBlogs = new EventEmitter<boolean>();
  recomendedBlogs: any[] = [];
  baseURL = 'https://backend-beta-dev.pomac.info/public';
  constructor(private service: AppService, private router: Router) {}

  onError(event: any) {
    event.target.src = 'assets/No-Image-Placeholder.svg';
  }
  router_details(item: any) {
    let originalText = item?.id + ' ' + item.title;
    console.log(item, 'momen');

    // استخدام replace لإزالة المسافات واستبدالها بـ -
    let formattedText = originalText.replace(/\s+/g, '-');
    this.router.navigate(['blog', formattedText], {
      state: { page: 'detail' },
    });
  }
  ngOnInit() {
    this.service.recommendedProjects(this.blogId).subscribe((res: any) => {
      this.recomendedBlogs = res?.data || [];
      const hasRecommendations = this.recomendedBlogs.length > 0;
      this.thereIsRecomendedBlogs.emit(hasRecommendations);
    });
  }
}
