"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Minus, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import axios from 'axios'
import Link from 'next/link'

interface CartItem {
  _id: string;
  productId: {
    name: string;
    imageUrl: string;
  };
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get<CartItem[]>('http://localhost:4000/cart/', {
      headers: {
        'Authorization': `${token}`
      }
    })
      .then(res => {
        setCartItems(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error('Error getting product from cart:', err);
      });
  }, [token])

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item._id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item._id !== id))
    
    axios.post('http://localhost:4000/cart/remove', { id })
      .then(res => {
        console.log(res.data);
      })
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 5.00;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-background">
      {cartItems.length === 0 ? (        
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-2xl font-bold text-foreground">Your cart is empty</h2>
          <p className="mt-4 text-center text-muted-foreground">
            Start adding items to your cart to see them here!
          </p>
          <Link href="/">
            <Button className="mt-4">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            <div className="lg:col-span-7">
              {cartItems.map((item) => (
                <div key={item._id} className="flex py-6 border-b border-border">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
                    <Image
                      src={item.productId.imageUrl}
                      alt={item.productId.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-foreground">
                        <h3>{item.productId.name}</h3>
                        <p className="ml-4">${item.price.toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          min="0"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                          className="h-8 w-16 mx-2 text-center"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => removeItem(item._id)}
                        className="text-primary hover:text-primary/80"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-lg bg-muted px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
              <h2 className="text-lg font-medium text-foreground">Order summary</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Subtotal</p>
                  <p className="text-sm font-medium text-foreground">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Shipping estimate</p>
                  <p className="text-sm font-medium text-foreground">${shipping.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Tax estimate</p>
                  <p className="text-sm font-medium text-foreground">${tax.toFixed(2)}</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-foreground">Order total</p>
                  <p className="text-base font-medium text-foreground">${total.toFixed(2)}</p>
                </div>
              </div>
              <Button className="w-full mt-6">Proceed to Checkout</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
