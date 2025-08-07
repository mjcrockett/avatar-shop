import { AfterViewInit, Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent implements AfterViewInit {

ngAfterViewInit(): void {
  const parts = 
  {
    "head":"assets/parts/zombie/head.png",
    "hair":"assets/parts/zombie/hair.png",
    "torso":"assets/parts/zombie/torso.png",
    "leftArm":"assets/parts/zombie/leftarm.png",
    "rightArm":"assets/parts/zombie/rightarm.png",
    "legs":"assets/parts/zombie/legs.png",
    "feet":"assets/parts/zombie/feet.png"
  };

  jQuery(() => {
    $('#avatarHolder').avatar({
      bodyParts: parts,
      facingRight: true,
      justTheHead: false,
      xPos: 5,
      yPos: -80,
      complete: function () {
          // $badgeAvatar.css({
          //     "width": "80%",
          //     "display": "block"
          // });
          // ready();
      }
    });
  });

}

}
