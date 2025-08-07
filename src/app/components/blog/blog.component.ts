import { Component, HostListener, OnInit } from '@angular/core';
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
  baseURL: any = environment.baseURL;
  color: any = '#FDFFD0';
  currentPage: number = 1;
  lastPage: number = 1;
  total: number = 1;
  categories: any = [];
  activeId: any = null;
  empty: boolean = false;
  constructor(private blog: AppService, private router: Router) {}

  ngOnInit(): void {
    AOS.init();
    this.getProjects(1, null);
    this.getCategories();
  }
  getProjects(page?: number, id?: any) {
    this.show = false;
    this.empty = false;
    this.blog
      .blogs(page, id)
      .pipe(map((res) => res['data']))
      .subscribe((projects) => {
        this.blogs.push(...projects?.data);
        this.show = true;
        this.isLoading = false;
        if (this.blogs.length == 0) {
          this.empty = true;
        }
        this.currentPage = projects.current_page;
        this.lastPage = projects.last_page;
        this.total = projects.total;
      });
  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    const threshold = 100;
    const position = window.innerHeight + window.scrollY;
    const height = document.body.scrollHeight;

    if (position >= height - threshold && this.currentPage < this.lastPage) {
      this.loadMore();
    }
  }
  onScrollDiv(event: any) {
    const element = event.target;
    const threshold = 100;

    if (
      element.scrollHeight - element.scrollTop <=
      element.clientHeight + threshold
    ) {
      if (this.currentPage < this.lastPage) {
        this.loadMore();
      }
    }
  }

  onError(event: any) {
    event.target.src = 'assets/No-Image-Placeholder.svg';
  }
  onErrorSvg(event: any) {
    event.target.src =
      'assets/images/error-placeholder-image-2e1q6z01rfep95v0.svg';
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
  }

  isLoading = false;

  loadMore() {
    if (this.currentPage < this.lastPage && !this.isLoading) {
      this.isLoading = true;
      this.currentPage += 1;
      this.getProjects(this.currentPage, this.activeId);
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
