import { AfterViewInit, Component } from '@angular/core';
import * as createjs from 'createjs-module';
import { first, fromEvent } from 'rxjs';
// import 'createjs';

@Component({
  selector: 'app-curtain',
  standalone: true,
  imports: [],
  templateUrl: './curtain.component.html',
  styleUrl: './curtain.component.scss'
})
export class CurtainComponent implements AfterViewInit {

  imagesLoaded: number = 0;
  images: { [key: string]: HTMLImageElement } = {};
  curtainAnimation: createjs.Sprite | undefined;
  ngAfterViewInit(): void {
    this.images['border'] = new Image();
    this.images['border'].onload = this._onLoad.bind(this);
    this.images['border'].src = 'assets/general/dressing_room_border.png';

    this.images['curtain'] = new Image();
    this.images['curtain'].onload = this._onLoad.bind(this);
    this.images['curtain'].src = 'assets/general/curtain.png'
  }

  shutCurtain(animationEnd?: () => void): void {
    const $end = fromEvent(<createjs.Sprite>this.curtainAnimation, 'animationend');
    $end.pipe(first()).subscribe(() => {
      if (animationEnd) {
        animationEnd();
      }
    });

    this.curtainAnimation?.gotoAndPlay("close");
  }

  openCurtain(animationEnd?: () => void): void {
    const $end = fromEvent(<createjs.Sprite>this.curtainAnimation, 'animationend');
    $end.pipe(first()).subscribe(() => {
      if (animationEnd) {
        animationEnd();
      }
    });

    this.curtainAnimation?.gotoAndPlay("open");
  }

  private _onLoad = () => {
    this.imagesLoaded++;
    if (this.imagesLoaded === 2) {
      this._initDressingRoom();
    }
  }

  private _initDressingRoom(): void {
    const stage = new createjs.Stage('curtain');
    createjs.Ticker.init(),
    createjs.Ticker.framerate = 15;
    const border = new createjs.Bitmap(this.images['border']);
    const sprite = new createjs.SpriteSheet({
        images: [this.images['curtain']],
        frames: {
            width: 342,
            height: 324
        },
        animations: {
            close: [0, 28, !1, 2],
            open: [29, 56, !1, 2]
        }
    });
    this.curtainAnimation = new createjs.Sprite(sprite,'open');
    stage.addChild(this.curtainAnimation),
    this.curtainAnimation.y = -5,

    // e.audioPlayer.mediaplayer("play", e.curtainAudioUrl),
    stage.addChild(border);
    createjs.Ticker.addEventListener("tick", () => {
        stage.update()
    });
  }
}
