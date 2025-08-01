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
    "head":"assets/parts/group3/head.png",
    "hair":"assets/parts/group3/hair.png",
    "torso":"assets/parts/group3/torso.png",
    "leftArm":"assets/parts/group3/leftarm.png",
    "rightArm":"assets/parts/group3/rightarm.png",
    "legs":"assets/parts/group3/legs.png",
    "feet":"assets/parts/group3/feet.png"
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
