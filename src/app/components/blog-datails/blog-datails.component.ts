import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

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
  blogs: any;
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
    this.getProjects();
  }
  getProjects() {
    this.blog
      .blog_details(this.id)
      .pipe(map((res) => res['data']))
      .subscribe((project) => {
        this.blog_details = project;
        console.log(this.blog_details);
        this.show = true;
      });
  }
}
