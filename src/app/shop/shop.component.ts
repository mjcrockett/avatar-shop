import { Component } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { Categories } from './models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CategoryComponent, CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  categories = Categories;
}
