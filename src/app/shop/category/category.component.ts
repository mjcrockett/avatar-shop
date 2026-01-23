import { Component, Input, OnInit } from '@angular/core';
import { Categories, Icons } from '../models';
import { ShopService } from '../shop.service';
import { BehaviorSubject, filter, first, map, Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  @Input()
  set category(value) {
    if (value) {
      this._category = value;
      this._refresh.next(true);
    }
  }
  get category(): Categories {
    return this._category;
  }

  categories = Categories;
  icons$?: Observable<Icons>;
  private _refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private _category: Categories = Categories.None;
  constructor(private readonly _shopService: ShopService) {}

  ngOnInit(): void {
    this.icons$ = this._refresh.pipe(
      switchMap((r) => this._shopService.GetIcons()),
      filter((icons) => !!icons && icons.length > 0),
      map((icons) => {
        return icons.filter((icon) => icon.iconsId === this.category)[0];
      }),
      // tap((icon) => console.log(icon))
    );
  }

  applySelected(partsId: number): void {
    this._shopService.GetPartsById(partsId).pipe(first(), map((p) => 
      {
        const basePath = `assets\\parts\\${p.partsName}\\`;
        switch (this.category) {
          case this.categories.Arms: 
            return { 
              leftArm: basePath + p.paths.leftArm,
              rightArm: basePath + p.paths.rightArm
            } as AvatarParts;
          case this.categories.Feet:
            return { 
              feet: basePath + p.paths.feet 
            } as AvatarParts;
          case this.categories.Hair:
            return {
              hair: p.paths.hair === '' ? '' : basePath + p.paths.hair
            } as AvatarParts;
          case this.categories.Heads:
            return {
              head: basePath + p.paths.head
            } as AvatarParts;
          case this.categories.Legs:
            return {
              legs: basePath + p.paths.legs
            } as AvatarParts;
          case this.categories.Torsos:
            return {
              torso: basePath + p.paths.torso
            } as AvatarParts;
          default: 
            return {
              head: basePath + p.paths.head,
              hair: basePath + p.paths.hair,
              torso: basePath + p.paths.torso,
              leftArm: basePath + p.paths.leftArm,
              rightArm: basePath + p.paths.rightArm,
              legs: basePath + p.paths.legs,
              feet: basePath + p.paths.feet,
            } as AvatarParts;
        }
      
    }
    )).subscribe((parts) => {
      this._shopService.currentBody.next(parts);
    });
  }
}
