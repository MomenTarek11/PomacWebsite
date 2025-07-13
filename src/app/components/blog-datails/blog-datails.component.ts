import * as AOS from 'aos';
import { Component, OnInit } from '@angular/core';
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
export class BlogDatailsComponent implements OnInit {
  baseURL: any = 'https://backend-beta-dev.pomac.info/public';

  id = '';
  show: boolean = false;
  blog_details: any;
  blogs: any= [];
  constructor(
    private route: ActivatedRoute,
    private blog: AppService,
    private router: Router
  ) {
    const number = this.route.snapshot.params.blog_id.match(/\d+/);
    this.id = number[0];
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state;
    console.log('Passed state:', state);
  }

  ngOnInit(): void {
    AOS.init();
    this.getProjects();
  }
  getProjects() {
    this.blog
      .blog_details(this.id)
      .pipe(map((res) => res['data']))
      .subscribe((project) => {
        this.blog_details = project;
        this.getallProject();
        console.log(this.blog_details);
        this.show = true;
      });
  }
   getallProject() {
    // this.show = false;
    this.blog
      .recommendedProjects(this.id)
      .pipe(map((res) => res['data']))
      .subscribe((projects) => {
        // console.log(projects);
        this.blogs = projects?.slice(0, 3); // projects?.data;
        this.show = true;
        // console.log(projects);

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
}
