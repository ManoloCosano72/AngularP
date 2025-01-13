import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  standalone: true,
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() alertMessage: string = '';
  @Input() alertClass: string = '';
  @Input() showAlert: boolean = false;
}
