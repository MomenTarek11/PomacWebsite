import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';
var services = require('src/app/data/services.json');
var team = require('src/app/data/team.json');
var technologies = require('src/app/data/technologies.json');


declare var AOS: any
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public services;
  public team;
  public technologies;
  // public employees;
  public baseURL = environment.baseURL;

  constructor(private service:AppService,public translate: TranslateService) { }

  ngOnInit(): void {
    this.getEmployees()
    this.getTechnologies()
    this.getServices()
    AOS.init();
    // this.services = services;
    // this.technologies = technologies;
    // this.team = team;
    // console.log(services)
  }
  getEmployees(){
    this.service.employees().pipe(map(res=>res['data'])).subscribe(employees=>{
      this.team = employees
    })
  }
  getTechnologies(){
    this.service.technologies().pipe(map(res=>res['data'])).subscribe(technologies=>{
      this.technologies = technologies
    })
  }
  getServices(){
    this.service.services().pipe(map(res=>res['data'])).subscribe(services=>{
      console.log(services)
      this.services = services
    })
  }
}
