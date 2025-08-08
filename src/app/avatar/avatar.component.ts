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
    "head":"assets/parts/group1/head.png",
    "hair":"assets/parts/banana/hair.png",
    "torso":"assets/parts/banana/torso.png",
    "leftArm":"assets/parts/banana/leftarm.png",
    "rightArm":"assets/parts/banana/rightarm.png",
    "legs":"assets/parts/banana/legs.png",
    "feet":"assets/parts/banana/feet.png"
  };

  jQuery(() => {
    $('#avatarHolder').avatar({
      bodyParts: parts,
      facingRight: true,
      justTheHead: false,
      shouldBlink: true,
      xPos: 40,
      yPos: 30,
      scale: 1,
      showShadow: false,
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
