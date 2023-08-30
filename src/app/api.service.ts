import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar) { }

  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

 

  openSnackBar(message: string, action: string = 'Close', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration,
    });
  }
 

  addToCart(item: any): void {
    const currentCart = this.cartItemsSubject.value;
     const existingItem = currentCart.find(cartItem => cartItem.item === item);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentCart.push({ item, quantity: 1 });
    }

    this.cartItemsSubject.next(currentCart);
  }

  removeFromCart(item: any): void {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.filter(cartItem => cartItem.item !== item);
    this.cartItemsSubject.next(updatedCart);
  }

  updateQuantity(item: any, quantity: number): void {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.map(cartItem =>
      cartItem.item === item ? { ...cartItem, quantity } : cartItem
    );

    this.cartItemsSubject.next(updatedCart);
  }

  getRestaurants(): Observable<any> {
    return this.http.get(`${this.baseUrl}/restaurants`);
  }

  getMenuItems(restaurantId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/restaurants/${restaurantId}`);
  }
}
