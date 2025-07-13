import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';
declare var AOS: any;
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {

  blogs: any = [];
  show: boolean = false;
  // endpoint: '',
  baseURL: any = 'https://backend-beta-dev.pomac.info/public';
  color: any = '#FDFFD0';
  currentPage: number = 1;
  lastPage: number = 1;
  total: number = 1;
  categories: any = [];
  activeId: any=null;
  constructor(private blog: AppService, private router: Router) {}

  ngOnInit(): void {
    AOS.init();
    this.getProjects(1 , null);
    this.getCategories();
  }
  getProjects(page?: number , id?: any) {
    // this.show = false;
    this.blog
      .blogs(page , id)
      .pipe(map((res) => res['data']))
      .subscribe((projects) => {
        // console.log(projects);
        this.blogs.push(...projects?.data); // projects?.data;
        this.show = true;
        // console.log(projects);
        this.currentPage = projects.current_page;
        this.lastPage = projects.last_page;
        this.total = projects.total;
        console.log(this.currentPage, this.lastPage, this.total);
      });
  }
  onError(event: any) {
    event.target.src = 'assets/No-Image-Placeholder.svg';
  }
  onErrorSvg(event: any) {
    event.target.src =
      'assets/images/error-placeholder-image-2e1q6z01rfep95v0.svg';
  }
  router_details(item: any) {
    // النص الأصلي مع المسافات
    let originalText = item?.id + ' ' + item.title;
    // استخدام replace لإزالة المسافات واستبدالها بـ -
    let formattedText = originalText.replace(/\s+/g, '-');
    this.router.navigate(['blog', formattedText], {
      state: { page: 'detail' },
    });
  }
  loadMore() {
    if (this.currentPage < this.lastPage) {
      this.currentPage += 1;
      console.log(this.currentPage, this.activeId , this.lastPage);

      this.getProjects(this.currentPage , this.activeId);
    }
  }
  getCategories() {
    this.blog.getCategories().subscribe((res: any) => {
      console.log(res);
      this.categories = res?.data;
    });
  }
changeCategory(id: any) {
  this.activeId = id;
  this.blogs = [];
this.getProjects(1, this.activeId);
  // console.log(arg0);

}
}
