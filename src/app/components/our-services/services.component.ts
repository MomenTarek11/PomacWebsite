import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';
declare var AOS: any;
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  public baseURL = environment.baseURL;

  home: any = [];
  home_data = {
    ques_en: 'Do you have an',
    idea_en: 'idea',
    mark_en: '?',
    talk_en: "Let's Talk.",
    contact_en: 'Contact us',
    ques_ar: 'هل لديك أي',
    idea_ar: 'أفكار',
    mark_ar: '؟',
    talk_ar: 'هيا أخبرنا بها.',
    contact_ar: 'تواصل معنا',
  };
  constructor(
    private service: AppService,
    public translate: TranslateService,
    private spinner: NgxSpinnerService
  ) {}
  show: boolean = false;
  ngOnInit(): void {
    AOS.init();
    this.getTestimonials();
  }
  getTestimonials() {
    this.spinner.show();

    this.service
      .services()
      .pipe(map((res) => res['data']))
      .subscribe((home) => {
        this.show = true;
        this.home = home;
        console.log(home, 'ssssssaafffffff');

        this.spinner.hide();
      });
  }
}
