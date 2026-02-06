import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

window.addEventListener('message', (event) => {
  if (event.data?.type === 'volume-change' && typeof event.data.volume === 'number') {
    const vol = Math.min(1, Math.max(0, event.data.volume));
    document.querySelectorAll('audio').forEach((el) => {
      el.volume = vol;
    });
  }
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
