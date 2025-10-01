import { Component } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { Categories } from './models';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CategoryComponent, CommonModule, BannerComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  categories = Categories;
}
