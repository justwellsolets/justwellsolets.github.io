import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private navbar: any;
  @ViewChild('navbarHeader', { static: false }) set setNavbar(nav: ElementRef) {
    this.navbar = nav.nativeElement;
    this.initNavbarObserver();
  }

  public skills = [
    'Angular',
    'HighCharts',
    'RxJS',
    'PrimeNG',
    'Angular Material',
    'Angular CDK',
    'TypeScript',
    'JavaScript',
    'SCSS',
    'HTML',
    'CSS',
    'GitLab',
    'GitHub',
    'ApexCharts',
    'Ionic',
    'Capacitor',
  ].map((skill, i) => ({
    skillName: skill,
    iconPosition: `-${100 * i}px 0`,
  }));

  public year = new Date().getFullYear();

  public flatpickrPR = `https://github.com/flatpickr/flatpickr/pull/2982`;
  public linkedIn = `https://www.linkedin.com/in/mrjsyadav/`;
  public github = `https://github.com/justwellsolets`;
  public resume = `https://drive.google.com/uc?id=1EVY9R6uMekcPXxTDifYnhXMBX2k_FTaz&export=download`;

  public callTo = `tel:+918819988729`;
  public mailTo = `mailto:career.jsyadav@gmail.com?subject=Let's%20Connect!&body=Hi%20Jitesh%2C%0A%0AI%20hope%20this%20message%20finds%20you%20well.%20I%20came%20across%20your%20portfolio%20and%20was%20impressed%20by%20your%20work.%20Furthermore%2C%20I'd%20love%20to%20connect%20and%20discuss%20potential%20opportunities%20for%20collaboration%2C%20or%20just%20have%20a%20chat%20about%20our%20shared%20interests.%0A%0ALooking%20forward%20to%20hearing%20from%20you!%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D`;
  public whatsappTo = `https://wa.me/918819988729?text=Hey%20Jitesh,%0A%0AI%20came%20across%20your%20portfolio%20and%20was%20really%20impressed%20by%20your%20work!%20I'd%20love%20to%20connect%20and%20chat%20about%20potential%20collaborations%20or%20just%20discuss%20our%20shared%20interests.%0A%0ALooking%20forward%20to%20connecting!%0A%0ABest,%0A%5BYour%20Name%5D`;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  private initNavbarObserver() {
    window.addEventListener('scroll', () => {
      if (window.scrollY) {
        this.navbar.classList.add('stuck');
      } else {
        this.navbar.classList.remove('stuck');
      }
    });
  }

  public navigateRoot() {
    this.router.navigate(['/']);
    window.scrollTo({
      top: 0
    });
  }

  public openLinkedInProfile() {
    window.open(this.linkedIn, '_blank');
  }

  public openGithubProfile() {
    window.open(this.github, '_blank');
  }

  public downloadResume() {
    const a = document.createElement('a');
    a.setAttribute('href', this.resume);
    a.setAttribute('download', 'Jitesh Yadav.pdf');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  public openFlatpickrPR() {
    window.open(this.flatpickrPR, '_blank');
  }

  public contactByPhone() {
    window.open(this.callTo, '_self');
  }

  public contactByMail() {
    window.open(this.mailTo, '_self');
  }

  public contactByWhatsApp() {
    window.open(this.whatsappTo, '_blank');
  }

  public navigateToSection(navItem: string) {
    this.router.navigateByUrl(`/#${navItem}`);
  }
}
