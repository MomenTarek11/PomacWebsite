import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
declare var AOS: any;
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  selected: any = '';
  public items = [];
  show: boolean = false;
  constructor(
    private service: AppService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    AOS.init();
    this.getTestimonials();
  }

  getTestimonials() {
    this.spinner.show();

    this.service.faqs().subscribe((home: any) => {
      this.show = true;
      this.items = home.data;
      this.items.forEach((element: any) => {
        return (element.show = false);
      });
      this.items[0].show = true;
      console.log(this.items, 'ssssssaafffffff');

      this.spinner.hide();
    });
  }
  toggl(item: any) {
    if (item.show == true) {
      item.show = !item.show;
      this.items.forEach((element: any) => {
        return (element.show = false);
      });
      setTimeout(() => {
        item.show = false;
      }, 0);
    } else {
      this.items.forEach((element: any) => {
        return (element.show = false);
      });
      setTimeout(() => {
        item.show = true;
      }, 0);
    }
  }
}
