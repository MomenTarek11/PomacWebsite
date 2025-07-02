import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/app.service';
declare var AOS: any
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  public items = [

  ];
  show:boolean=false
  constructor(private service:AppService,private spinner:NgxSpinnerService ,private router:Router) { }

  ngOnInit(): void {
    AOS.init();
    this.getTestimonials()
  }
  getTestimonials(){
    this.spinner.show()

    this.service.jobs().subscribe((home:any)=>{
      this.show=true
      this.items = home.data

     console.log(this.items , 'ssssssaafffffff');

    this.spinner.hide()

    })
}
router_details(item:any){
  // النص الأصلي مع المسافات
let originalText = item?.id + ' ' + item.title;

// استخدام replace لإزالة المسافات واستبدالها بـ -
let formattedText = originalText.replace(/\s+/g, '-');
this.router.navigate(['jobs',formattedText])
}
}
