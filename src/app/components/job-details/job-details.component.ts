import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';
declare var AOS: any;
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  id = '';
  show: boolean = false;
  blog_details: any;
  files: File[] = [];

  // Event when files are dragged over the drop zone
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // Add a class to show visual feedback
    const dropzone = event.target as HTMLElement;
    dropzone.classList.add('dragover');
  }

  // Event when drag leaves the drop zone
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = event.target as HTMLElement;
    dropzone.classList.remove('dragover');
  }

  // Event when files are dropped into the drop zone
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = event.target as HTMLElement;
    dropzone.classList.remove('dragover');

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.files = Array.from(event.dataTransfer.files); // Save the dropped files
      console.log(this.files); // Print the files to the console
    }
  }

  // Event when files are selected manually
  onFileSelected(event: any) {
    const selectedFiles = event.target.files;
    this.files = Array.from(selectedFiles);
    console.log(this.files); // Print the selected files to the console
  }
  constructor(private route: ActivatedRoute, private job: AppService) {
    const number = this.route.snapshot.params.job_id.match(/\d+/);
    this.id = number[0];
  }

  ngOnInit(): void {
    AOS.init();
    this.getProjects();
  }
  getProjects() {
    this.job
      .job_details(this.id)
      .pipe(map((res) => res['data']))
      .subscribe((project) => {
        this.blog_details = project;
        console.log(this.blog_details);

        this.show = true;
      });
  }
  upload() {
    let form = {
      job_id: this.id,
      cv: this.files[0],
    };
    this.job.upload_cv(form).subscribe((project) => {
      Swal.fire('نجاح', ' تم رفع السيرة الذاتية');
      this.files = [];
    });
  }
}
