import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any[]>;
  products: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getCategories().valueChanges();

    let id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.productService
        .get(id)
        .pipe(take(1))
        .subscribe((p) => (this.products = p));
  }

  ngOnInit(): void {}

  save(product: any) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
