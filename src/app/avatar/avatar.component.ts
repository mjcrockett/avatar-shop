import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShopService } from '../shop/shop.service';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { CurtainComponent } from './curtain/curtain.component';
declare var $: any;

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CurtainComponent],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('curtain') curtainComponent!: CurtainComponent;
  private _$avatar: any;
  private _reacting: boolean = false; 
  private _onReady: Subject<boolean> = new Subject<boolean>();
  private _initialized: boolean = false;
  private _destroyed$ = new Subject();
  constructor(private readonly _shopService: ShopService) {}

  ngOnInit(): void {
    combineLatest({
      ready: this._onReady,
      body: this._shopService.currentBody
    })
    .pipe(takeUntil(this._destroyed$)).subscribe((both) => {
      const that = this;
      if (!this._initialized) {
        
        that._$avatar.avatar({
          bodyParts: both.body,
          facingRight: true,
          justTheHead: false,
          shouldBlink: true,
          xPos: 40,
          yPos: 30,
          scale: 1,
          showShadow: false,
          complete: function () {

            that._initialized = true;
            setTimeout(() => {
              that._$avatar.avatar("wave", () => {});
            }, 1300);
          },
        });
      } else {
        that.curtainComponent.shutCurtain(() => {
          that._$avatar.avatar('insertNewParts', both.body, () => {
            that.curtainComponent.openCurtain(() => {
              that._performRandomReaction();
            });
          });
        });
      }
      
    });
  }

  ngAfterViewInit(): void {
    //To do: check local storage for pre-selected parts
    // const parts = {
    //   head: 'assets/parts/group1/head.png',
    //   hair: 'assets/parts/endIsNigh/hair.png',
    //   torso: 'assets/parts/endIsNigh/torso.png',
    //   leftArm: 'assets/parts/endIsNigh/leftarm.png',
    //   rightArm: 'assets/parts/endIsNigh/rightarm.png',
    //   legs: 'assets/parts/endIsNigh/legs.png',
    //   feet: 'assets/parts/endIsNigh/feet.png',
    // };

    // this._shopService.currentBody.next(parts);

    jQuery(() => {

      this._$avatar = $('#avatarHolder');
      this._onReady.next(true);
    });
  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }

  private _performRandomReaction(): void {

    if (this._reacting) {
      return;
    }

    const that = this;
    that._reacting = true;
    const t = Math.floor(100 * Math.random());

    if (t > 97) {
      that._$avatar.avatar("confused", function() {
        that._reacting = false;
      });
    }
    else if (t > 92) {
      that._$avatar.avatar("laughing", function() {
        that._reacting = false;
      });
    }
    else if (t > 83) {

      that._$avatar.avatar("mouth","ooo");
      setTimeout(() => {
        that._$avatar.avatar("disableActions"),
        that._$avatar.avatar("mouth", "neutral"),
        that._$avatar.avatar("eyes", "confused"),
        setTimeout(() => {
          that._$avatar.avatar("mouth", "frown"),
          that._$avatar.avatar("eyes", "hard-close"),
          setTimeout(() => {
            that._$avatar.avatar("enableActions"),
            that._$avatar.avatar("mouth", "neutral"),
            that._reacting = false;
          }, 3000)
        }, 1300)
      }, 1300);
    }
    else if (t > 60) {

      that._$avatar.avatar("mouth", "ooo"),
      setTimeout(() => {
        that._$avatar.avatar("disableActions"),
        that._$avatar.avatar("mouth", "smirk"),
        that._$avatar.avatar("eyes", "confused"),
          setTimeout(() => {
            that._$avatar.avatar("mouth", "smirk"),
            that._$avatar.avatar("eyes", "closed"),
            setTimeout(() => {
              that._$avatar.avatar("enableActions"),
              that._$avatar.avatar("mouth", "neutral"),
              that._reacting = false;
            }, 2300)
          }, 1300)
      }, 1300);
    }
    else if (t > 30) {

      that._$avatar.avatar("mouth", "smile"),
      setTimeout(() => {
        that._$avatar.avatar("disableActions"),
        that._$avatar.avatar("mouth", "smile"),
        that._$avatar.avatar("eyes", "excited"),
          setTimeout(() => {
            that._$avatar.avatar("mouth", "full-smile"),
            that._$avatar.avatar("eyes", "closed"),
            setTimeout(() => {
              that._$avatar.avatar("enableActions"),
              that._$avatar.avatar("mouth", "neutral"),
              that._reacting = false;
            }, 2300)
          }, 1300)
      }, 1300);
    }
    else {

      that._$avatar.avatar("mouth", "smile"),
      setTimeout(() => {
        that._reacting = false;
        that._$avatar.avatar("mouth", "neutral");
      }, 2300);
    }
  }
}
