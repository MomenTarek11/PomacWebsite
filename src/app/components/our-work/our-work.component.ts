import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';
import * as AOS from 'aos';
var projects = require('src/app/data/projects.json');

@Component({
  selector: 'app-our-work',
  templateUrl: './our-work.component.html',
  styleUrls: ['./our-work.component.scss'],
})
export class OurWorkComponent implements OnInit {
  public projects;
  show: boolean = false;
  public baseURL = environment.baseURL;

  constructor(
    public translate: TranslateService,
    private service: AppService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    AOS.init();
    // this.projects = projects;
    // console.log(projects)
    this.getProjects();
  }

  getProjects() {
    this.spinner.show();
    this.service
      .projects()
      .pipe(map((res) => res['data']))
      .subscribe((projects) => {
        console.log(projects);
        console.log(projects);
        this.projects = projects;
        setTimeout(() => {
          this.show = true;
        }, 500);
        this.spinner.hide();
      });
  }
  openProject(item: any) {
    const id = item.id;
    const name = item.name_EN || '';

    const slug = name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\u0600-\u06FF]+/g, '-') // يدعم العربي
      .replace(/^-+|-+$/g, '');

    this.router.navigate(['/our-work', id, slug]);
  }
}
