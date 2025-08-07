import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public brandsService: BehaviorSubject<any> = new BehaviorSubject({});
  // watch data
  // public subject = new Subject<any>();
  public className: any = '';
  private source = new BehaviorSubject(this.className);
  // private currentLocation = this.locationSource.asObservable();
  // this.locationSource = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('location') || '{}'));
  setScroll(className: any) {
    this.source.next(className);
  }
  getScroll() {
    return this.source.asObservable();
  }
  // getScroll() {
  constructor(private http: HttpClient) {}

  setting() {
    return this.http.get(`${environment.endpoint}/setting`);
  }
  testimonials() {
    return this.http.get(`${environment.endpoint}/testimonials?status=show`);
  }
  homeProjects() {
    return this.http.get(`${environment.endpoint}/home/projects`);
  }

  homeServices() {
    return this.http.get(`${environment.endpoint}/home/services`);
  }

  homeTestimonials() {
    return this.http.get(`${environment.endpoint}/home/testimonials`);
  }

  homeSections() {
    return this.http.get(`${environment.endpoint}/home/sections`);
  }

  homeFaqs() {
    return this.http.get(`${environment.endpoint}/home/faqs`);
  }
  employees() {
    return this.http.get(`${environment.endpoint}/employees?status=show`);
  }
  technologies() {
    return this.http.get(`${environment.endpoint}/technologies?status=show`);
  }
  services() {
    return this.http.get(`${environment.endpoint}/services?status=show`);
  }
  faqs() {
    return this.http.get(`${environment.endpoint}/faqs`);
  }
  jobs() {
    return this.http.get(`${environment.endpoint}/jobs`);
  }
  projects() {
    return this.http.get(
      `${environment.endpoint}/projects/importance?status=show`
    );
  }
  recommendedProjects(blog_id: any) {
    return this.http.get(
      `${environment.endpoint}/blogs/recommended?blog_id=${blog_id}`
    );
  }
  // /blogs/recommended?blog_id=7\
  blogs(page?: number, id?: any) {
    let params = new HttpParams();
    if (page !== null && page !== undefined) {
      params = params.set('page', page.toString());
    }

    if (id !== null) {
      params = params.set('category_id', id);
    }

    return this.http.get(`${environment.endpoint}/blogs`, { params });
  }
  blog_details(slug: any) {
    return this.http.get(`${environment.endpoint}/blog/show?slug=${slug}`);
  }
  job_details(id: any) {
    return this.http.get(`${environment.endpoint}/job/show?job_id=${id}`);
  }
  upload_cv(form: any) {
    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(form)) {
      if (value != null) {
        if (key == `cv`) {
          formData.append(`cv`, form.cv);
        }

        formData.append(key, `${value}`);
      }
    }
    return this.http.post(`${environment.endpoint}/cv/upload`, formData);
  }
  project(slug) {
    return this.http.get(`${environment.endpoint}/projects/show?slug=${slug}`);
  }
  contact(form) {
    return this.http.post(`${environment.endpoint}/contact`, form);
  }
  getCategories() {
    return this.http.get(`${environment.endpoint}/blogs-categories`);
  }
}
