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
    "head":"assets/parts/bart/head.png",
    "hair":"assets/parts/bart/hair.png",
    "torso":"assets/parts/bart/torso.png",
    "leftArm":"assets/parts/bart/leftarm.png",
    "rightArm":"assets/parts/bart/rightarm.png",
    "legs":"assets/parts/bart/legs.png",
    "feet":"assets/parts/bart/feet.png"
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
