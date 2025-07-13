import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit {
  setting: any;
  show: boolean = false;
  url: string;
  constructor(
    private service: AppService,
    public translate: TranslateService,
    private router: Router
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        var url = window.location.href;
        var urll = url.split('/');
        this.url = urll[3];
      });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.service
        .setting()
        .pipe(map((res) => res['data']))
        .subscribe((setting) => {
          this.setting = setting;
          this.show = true;
        });
    });
  }
  // scrollToClassName(className: string) {

  //   console.log(className)
  //   this.service.setScroll(className)
  // }
  scrollToClassName(className: string) {
    // this.route = className
    // this.service.setScroll(className)
    this.router.navigate([], { fragment: className });
    // on component load scroll to element with id
    // const element = document.querySelector('#' + className)
    // if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  goToHome() {
    let dir = location.pathname.split('/');
    console.log(dir[1]);

    if (dir[1] == 'our-work') {
      this.router.navigate(['/home'], {
        queryParams: {
          dir: 'service',
        },
      });
    } else if (dir[1] == 'project-details') {
      this.router.navigate(['/home'], {
        queryParams: {
          dir: 'service',
        },
      });
    } else {
      document.getElementById('Services')?.scrollIntoView();
    }
  }
}
