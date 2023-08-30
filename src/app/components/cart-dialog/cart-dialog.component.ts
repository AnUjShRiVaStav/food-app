import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss']
})
export class CartDialogComponent implements OnInit {
 constructor(public appService: ApiService,
  private dialogRef: MatDialogRef<any>){}

 cartItems: any[] = [];

 ngOnInit(): void {
     this.appService.cartItems$.subscribe(data => {
      this.cartItems = data 
      console.log(this.cartItems)
    })
 }

 updateQuantity(cartItem: any, newQuantity: number): void {
  if (newQuantity > 0) {
    this.appService.updateQuantity(cartItem.item, newQuantity);
  }
}

removeItem(item: any): void {
  this.appService.removeFromCart(item);
if(this.cartItems.length == 0) this.dialogRef.close()
}

calculateTotal(cartItem: any) {
  return cartItem.quantity * cartItem.item.price;
}

calculateOverallTotal() {
  let overallTotal = 0;
  for (const cartItem of this.cartItems) {
    overallTotal += this.calculateTotal(cartItem);
  }
  return overallTotal.toFixed(2);
}

}
