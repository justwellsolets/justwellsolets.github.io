import { Component, Input } from '@angular/core';
import { IContact } from '../../entities/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  @Input() contacts: IContact[] = [];
}
