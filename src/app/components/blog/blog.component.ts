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
  baseURL: any = environment.baseURL;
  color: any = '#FDFFD0';
  categories: any = [
    {
      icon: 'assets/images/fluent_document-one-page-multiple-16-regular.svg',
      name: 'جميع المقالات',
    },
    {
      icon: 'assets/images/fluent_document-one-page-multiple-16-regular.svg',
      name: 'التجارة الكترونية',
    },
    {
      icon: 'assets/images/fluent_document-one-page-multiple-16-regular.svg',
      name: 'التسويق و التقنية',
    },
    {
      icon: 'assets/images/fluent_document-one-page-multiple-16-regular.svg',
      name: 'ريادة الأعمال',
    },
    {
      icon: 'assets/images/fluent_document-one-page-multiple-16-regular.svg',
      name: 'المالية',
    },
  ];
  constructor(private blog: AppService, private router: Router) {}

  ngOnInit(): void {
    AOS.init();
    this.getProjects();
  }
  getProjects() {
    this.blog
      .blogs()
      .pipe(map((res) => res['data']))
      .subscribe((projects) => {
        console.log(projects);
        this.blogs = projects;
        this.show = true;
      });
  }
  router_details(item: any) {
    const id = item?.id;
    const title = item?.title || '';

    // 🧼 تنظيف العنوان: حذف الرموز الخاصة والمسافات المكررة وتحويلها إلى lowercase
    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\u0600-\u06FF]+/g, '-') // يدعم الحروف العربية
      .replace(/^-+|-+$/g, ''); // يشيل - من البداية أو النهاية

    const formattedText = `${id}-${slug}`;

    this.router.navigate(['blog', formattedText], {
      state: { page: 'detail' },
    });
  }
}
