import { Component } from '@angular/core';
import { AvatarComponent } from './avatar/avatar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ AvatarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'avatar-shop';
}
