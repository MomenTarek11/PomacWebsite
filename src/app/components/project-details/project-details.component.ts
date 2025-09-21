import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';
var services = require('src/app/data/services.json');
var team = require('src/app/data/team.json');
var technologies = require('src/app/data/technologies.json');
declare var AOS: any;

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectDetailsComponent implements OnInit {
  //   public services;
  //   public team;
  projects;
  public technologies;
  url;
  project_id: any;
  product_name = this.route.snapshot.paramMap.get('project-name');
  project;
  public baseURL = environment.baseURL;
  // public viewerOptions: any = {
  //   navbar: true,
  //   title : false,
  //   toolbar: {
  //     zoomIn: false,
  //     zoomOut: false,
  //     oneToOne: false,
  //     reset: false,
  //     prev: 4,
  //     play: {
  //       show: 4,
  //       size: 'large',
  //     },
  //     next: 4,
  //     rotateLeft: false,
  //     rotateRight: false,
  //     flipHorizontal: false,
  //     flipVertical: false,
  //   }
  // };
  constructor(
    public translate: TranslateService,
    private service: AppService,
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    AOS.init();
    this.route.paramMap.subscribe((params) => {
      this.project_id = params.get('slug');
      this.product_name = params.get('project-name');

      // Reset data while loading new project
      this.project = null;
      this.projects = null;

      // Load new project data
      this.getProject(this.project_id);
      this.getProjects(this.project_id);
    });
  }

  labtop: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    center: true,
    dots: true,
    // lazyLoad: true,
    navSpeed: 700,
    autoplay: true,
    slideTransition: 'linear',
    smartSpeed: 500,
    navText: ['', ''],
    nav: false,
    margin: 90,
    // fullWidth:false,
    // autoWidth:false,
    // rewindNav: false,
    responsive: {
      0: {
        items: 1,
        stagePadding: 0,
      },
      600: {
        items: 2,
        stagePadding: 0,
      },
      1000: {
        items: 2,
        stagePadding: 0,
      },
      1200: {
        items: 2,
        stagePadding: 0,
      },
      1400: {
        items: 2,
        stagePadding: 0,
      },
      1600: {
        items: 2,
        stagePadding: 0,
      },
      1800: {
        items: 2,
        stagePadding: 0,
      },
    },
  };
  mobile: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    center: true,
    dots: true,
    lazyLoad: true,
    navSpeed: 700,
    autoplay: true,
    slideTransition: 'linear',
    smartSpeed: 1000,
    navText: ['', ''],
    nav: false,
    margin: 90,
    responsive: {
      0: {
        items: 1,
        stagePadding: 0,
      },
      600: {
        items: 2,
        stagePadding: 0,
      },
      1000: {
        items: 3,
        stagePadding: 0,
      },
      1200: {
        items: 3,
        stagePadding: 0,
      },
      1400: {
        items: 3,
        stagePadding: 0,
      },
      1600: {
        items: 3,
        stagePadding: 0,
      },
      1800: {
        items: 3,
        stagePadding: 0,
      },
    },
  };
  getProject(project_id) {
    this.spinner.show();
    this.service
      .project(project_id)
      .pipe(map((res) => res['data']))
      .subscribe((project) => {
        this.project = project;
        console.log(project?.info, 'momen');
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.youtube.com/embed/' + project.path.vedio
        );
        this.spinner.hide();
      });
  }
  getProjects(item: any) {
    this.service
      .projects()
      .pipe(map((res) => res['data']))
      .subscribe((projects) => {
        console.log(projects);
        console.log(projects);
        this.projects = projects;
        this.projects = this.projects.filter((e: any) => {
          return e.id != item;
        });
        console.log(this.projects, 'this.projects');
      });
  }
  viewProject(slug) {
    // this.router.navigate(['/project-details',id,name]).then(() => {
    //   // window.location.reload();
    // });
    //   this.router.navigate(['.'], { relativeTo: this.route, queryParams: {
    //    id:id,
    //    name:name
    // }})
    // window.open(`https://pomac.info/our-work/${slug}`, '_self', '');
    // this.router.navigate(["/home"])
    // window.location.reload()
    this.router.navigate(['our-work', slug]);
    this.getProject(this.project_id);
  }
}
