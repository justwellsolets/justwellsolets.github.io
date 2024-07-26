import { Component, Input } from '@angular/core';
import { ICertificate } from '../../entities/certificate';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss',
})
export class CertificatesComponent {
  @Input() certificates: ICertificate[] = [];
}
