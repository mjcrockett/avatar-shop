import { Component, Input, OnInit } from '@angular/core';
import { Categories, Icons } from '../models';
import { ShopService } from '../shop.service';
import { BehaviorSubject, filter, map, Observable, Subject, switchMap, tap } from 'rxjs';
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
}
