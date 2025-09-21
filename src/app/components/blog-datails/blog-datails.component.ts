import * as AOS from 'aos';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';
import { Meta, Title, DomSanitizer } from '@angular/platform-browser';
declare var AOS: any;

@Component({
  selector: 'app-blog-datails',
  templateUrl: './blog-datails.component.html',
  styleUrls: ['./blog-datails.component.scss']
})
export class BlogDatailsComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('contentCol') contentCol!: ElementRef;
  @ViewChild('sidebarCol') sidebarCol!: ElementRef;
  baseURL = environment.baseURL;
  id: any;
  show = false;
  blog_details: any;
  blogs: any[] = [];
  showRecommendedBlogs = true;
  @ViewChild('blogContent') blogContent!: ElementRef;
  isMobile = window.innerWidth < 768;
  private subscriptions = new Map();
  
  constructor(
    private route: ActivatedRoute,
    private blog: AppService,
    private cdr: ChangeDetectorRef
  ) {}
  
  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  trackByFn(index: number): number {
    return index;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const slug = params?.blog_id;
      if (slug) {
        this.getProjectBySlug(slug);
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.blogContent) {
      this.processImages();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['blog_details'] && this.blog_details?.content) {
      setTimeout(() => this.processImages(), 0);
    }
  }

  private optimizeImage(img: HTMLImageElement) {
    // Store original src
    const originalSrc = img.src;
    
    // Set initial styles before loading
    Object.assign(img.style, {
      opacity: '1', // Start visible
      display: 'block',
      margin: '10px auto',
      borderRadius: '12px',
      height: 'auto',
      objectFit: 'cover',
    });

    // Set size based on device
    if (!this.isMobile) {
      img.style.maxWidth = '100%';
      img.style.maxHeight = 'auto';
    } else {
      img.style.width = '100%';
    }

    // Create a new image to preload
    const tempImage = new Image();
    tempImage.onload = () => {
      // Once loaded, set the original image src
      img.src = originalSrc;
      img.style.opacity = '1';
    };

    tempImage.onerror = () => {
      console.error('Image failed to load:', originalSrc);
      img.src = 'assets/No-Image-Placeholder.svg';
      img.style.opacity = '1';
    };

    // Start loading
    tempImage.src = originalSrc;
    
    // Prevent context menu
    img.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  processImages() {
    if (!this.blogContent) return;

    const container = this.blogContent.nativeElement;
    const images = Array.from(container.querySelectorAll('p img,h2 img'));
    const paragraphs = container.querySelectorAll('p');

    if (images.length === 0) return;

    // Use Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          this.optimizeImage(img);
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    // Process images in batches
    const processImageBatch = (startIndex: number) => {
      const BATCH_SIZE = 5;
      const endIndex = Math.min(startIndex + BATCH_SIZE, images.length);
      
      window.requestAnimationFrame(() => {
        for (let i = startIndex; i < endIndex; i++) {
          const img = images[i] as HTMLImageElement;
          imageObserver.observe(img);
          
          // img.setAttribute('loading', 'lazy');
          // img.setAttribute('decoding', 'async');
          // img.setAttribute('importance', 'low');
          
          // Prevent layout shift
          if (img.width && img.height) {
            const aspectRatio = img.height / img.width;
            const parent = img.parentElement;
            if (parent) {
              // parent.style.paddingBottom = `${aspectRatio * 100}%`;
              parent.style.position = 'relative';
            }
          }
        }

        if (endIndex < images.length) {
          setTimeout(() => processImageBatch(endIndex), 0);
        } else {
          this.cdr.detectChanges();
        }
      });
    };

    // Start processing images
    processImageBatch(0);

    // Style paragraphs
    requestAnimationFrame(() => {
      paragraphs.forEach((p: HTMLParagraphElement) => {
        Object.assign(p.style, {
          textAlign: 'right',
          fontSize: '18px'
        });
      });
    });
  }

  getProjectBySlug(slug) {
    if (!slug) return;

    this.showRecommendedBlogs = false;
    this.show = false;
    this.cdr.markForCheck();

    const blogSub = this.blog
      .blog_details(slug)
      .pipe(map((res) => res['data']))
      .subscribe({
        next: (project) => {
          this.blog_details = project;
          this.id = this.blog_details.id;
          this.show = true;
          this.showRecommendedBlogs = true;
          
          // Trigger change detection after data is set
          this.cdr.markForCheck();
          
          // Process images in next animation frame
          requestAnimationFrame(() => {
            this.processImages();
            
            // Update sidebar height after images are processed
            if (this.contentCol?.nativeElement && this.sidebarCol?.nativeElement) {
              const contentHeight = this.contentCol.nativeElement.offsetHeight;
              this.sidebarCol.nativeElement.style.height = contentHeight + 'px';
            }
            
            // Ensure changes are reflected in the view
            this.cdr.detectChanges();
          });
        },
        error: (error) => {
          console.error('Error fetching blog details:', error);
          this.show = true;
          this.cdr.markForCheck();
        }
      });
  }

  // updateMetaTags() {
  //   if (!this.blog_details) return;

  //   // Set title
  //   this.title.setTitle(this.blog_details.title);
    
  //   // Set description
  //   this.meta.updateTag({ name: 'description', content: this.blog_details.summary });
    
  //   // Open Graph tags (for Facebook, WhatsApp, etc.)
  //   this.meta.updateTag({ property: 'og:type', content: 'article' });
  //   this.meta.updateTag({ property: 'og:title', content: this.blog_details.title });
  //   this.meta.updateTag({ property: 'og:description', content: this.blog_details.summary });
    
  //   // Handle image URL - ensure it's absolute
  //   let imageUrl = this.blog_details.image;
  //   if (imageUrl && !imageUrl.startsWith('http')) {
  //     imageUrl = this.baseURL + imageUrl;
  //   }
  //   this.meta.updateTag({ property: 'og:image', content: imageUrl });
    
  //   this.meta.updateTag({ property: 'og:url', content: window.location.href });
  //   this.meta.updateTag({ property: 'og:site_name', content: 'Your Site Name' }); // Replace with your site name
  
  //   // Twitter Card tags
  //   this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  //   this.meta.updateTag({ name: 'twitter:title', content: this.blog_details.title });
  //   this.meta.updateTag({ name: 'twitter:description', content: this.blog_details.summary });
  //   this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    
  // }

  onError(event: any) {
    event.target.src = 'assets/No-Image-Placeholder.svg';
  }
  
  onErrorSvg(event: any) {
    event.target.src = 'assets/images/error-placeholder-image-2e1q6z01rfep95v0.svg';
  }
  
  handleRecomendedStatus(hasRecommendations: boolean) {
    this.showRecommendedBlogs = hasRecommendations;
    console.log('Recommended blogs available?', hasRecommendations);
  }
  
  openWhatsApp() {
    window.open('https://api.whatsapp.com/send?phone=201094969284', '_blank');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions.clear();
  }

  private addSubscription(key: string, subscription: any) {
    if (this.subscriptions.has(key)) {
      this.subscriptions.get(key).unsubscribe();
    }
    this.subscriptions.set(key, subscription);
  }
}