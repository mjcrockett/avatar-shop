import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from '../shop/shop.service';
import { BehaviorSubject, combineLatest, Subject, takeUntil } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent implements OnInit, AfterViewInit, OnDestroy {
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
      if (!this._initialized) {
        const that = this;
        $('#avatarHolder').avatar({
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
          },
        });
      } else {
        $('#avatarHolder').avatar('insertNewParts', both.body);
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
    //   $('#avatarHolder').avatar({
    //     bodyParts: parts,
    //     facingRight: true,
    //     justTheHead: false,
    //     shouldBlink: true,
    //     xPos: 40,
    //     yPos: 30,
    //     scale: 1,
    //     showShadow: false,
    //     complete: function () {
    //       // $badgeAvatar.css({
    //       //     "width": "80%",
    //       //     "display": "block"
    //       // });
    //       // ready();
    //     },
    //   });
      this._onReady.next(true);
    });
  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
}
