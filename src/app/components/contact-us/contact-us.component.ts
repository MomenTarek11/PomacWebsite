import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  public form: UntypedFormGroup;
  public submitted = false;

  constructor(private formbuilder:UntypedFormBuilder,private service:AppService,private router:Router) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      country:['',Validators.required],
      phone:['',Validators.required],
      description:['',Validators.required]
    })
  }

  // submit(){
  //   this.submitted = true;
  //   console.log('Doneeeeeeeeeeeeeeeeeeeee')
  // }
  // get f() { return this.form.controls }
  get f(){return this.form.controls}

  onSubmit() {
    this.submitted = true;
    // console.log(this.form.value)
    console.log(this.form.value)
    if (this.form.invalid) { return }
    console.log(this.form.value)
    return this.service.contact(this.form.value).pipe().subscribe((response)=>{
      Swal.fire('Thank you '+ this.form.value['name'] +',', 'Message received successfully!', 'success')
      this.form.reset()
      this.submitted = false
      this.router.navigate(["/home"])
    })
  }
}
