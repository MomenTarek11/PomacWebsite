import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-choosen-blogs',
  templateUrl: './choosen-blogs.component.html',
  styleUrls: ['./choosen-blogs.component.scss'],
})
export class ChoosenBlogsComponent implements OnInit {
  loadMore() {
    throw new Error('Method not implemented.');
  }
  show: boolean = false;
  blogs: any[] = [];
  baseURL = environment.baseURL;
  constructor(private service: AppService, private router: Router) {}
  ngOnInit(): void {
    this.getChoosenBlogs();
  }
  getChoosenBlogs() {
    this.service.getChoosenBlogs().subscribe((res: any) => {
      this.blogs = res.data;
      this.show = true;
    });
  }
  openBlog(project: any) {
    this.router.navigate([`/blog/${project.slug}`]);
  }
  onError(event: any) {
    event.target.src = 'assets/No-Image-Placeholder.svg';
  }
  onErrorSvg(event: any) {
    event.target.src =
      'assets/images/error-placeholder-image-2e1q6z01rfep95v0.svg';
  }
}
