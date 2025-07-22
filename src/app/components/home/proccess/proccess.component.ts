import { Component } from '@angular/core';

@Component({
  selector: 'app-proccess',
  templateUrl: './proccess.component.html',
  styleUrls: ['./proccess.component.scss'],
})
export class ProccessComponent {
  processes: any[] = [
    {
      icon: 'assets/icons/proccess_four.webp',
      title: 'أبحاث ما قبل التأسيس :',
      description: 'نفهم جمهورك والسوق لضمان جاهزية فكرتك.',
    },
    {
      icon: 'assets/icons/proccess_three.webp',
      title: 'بناء MVP :',
      description: 'نصمم ونطور منتجك الأولي بسرعة وبأعلى جودة.',
    },
    {
      icon: 'assets/icons/process_two.webp',
      title: 'التسويق والنمو :',
      description: 'نساعدك في جذب العملاء، بناء الوعي، وتحقيق نمو مستدام.',
    },
    {
      icon: 'assets/icons/procces_one.webp',
      title: 'إعداد الجولات الاستثمارية :',
      description: 'نهيئك لجذب المستثمرين وتمويل شركتك.',
    },
  ];
  baseURL: any;
  openWhatsapp() {
    window.open('https://api.whatsapp.com/send?phone=201094969284', '_blank');
  }
}
