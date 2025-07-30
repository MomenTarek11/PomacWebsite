import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recomended-blogs',
  templateUrl: './recomended-blogs.component.html',
  styleUrls: ['./recomended-blogs.component.scss'],
})
export class RecomendedBlogsComponent {
  @Input({ required: true }) blogId: any;
  @Output() thereIsRecomendedBlogs = new EventEmitter<boolean>();
  recomendedBlogs: any[] = [];
  // baseURL = 'https://backend-beta-dev.pomac.info/public';
  baseURL = environment.baseURL;
  constructor(private service: AppService, private router: Router) {}

  onError(event: any) {
    event.target.src = 'assets/No-Image-Placeholder.svg';
  }
  router_details(item: any) {
    let originalText = item?.id + ' ' + item.title;
    let formattedText = originalText.replace(/\s+/g, '-');
    this.router.navigate(['blog', formattedText], {
      state: { page: 'detail', id: item?.id },
    });
    this.getRecomendedBlogs(item?.id);
  }
  ngOnInit() {
    console.log(this.blogId, 'id ya rais');
    this.getRecomendedBlogs();
  }
  getRecomendedBlogs(BlogId?: any) {
    this.service.recommendedProjects(this.blogId).subscribe((res: any) => {
      this.recomendedBlogs = res?.data || [];
      const hasRecommendations = this.recomendedBlogs.length > 0;
      this.thereIsRecomendedBlogs.emit(hasRecommendations);
      // console.log(this.recomendedBlogs, 'al;dsfjlmdsafk;ad;jf');
    });
  }
}
