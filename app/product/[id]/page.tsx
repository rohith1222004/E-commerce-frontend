// "use client"
// import { useState, useEffect } from 'react'
// import Image from 'next/image'
// import { Star, Minus, Plus, ShoppingCart, User } from 'lucide-react'

// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import axios from 'axios'
// import { useRouter } from 'next/navigation'

// type Product = {
//   id: string;
//   productName: string;
//   price: number;
//   description: string;
//   imageUrl: undefined | string;
//   category: string;
//   rating?: number;
// };

// export default function ProductDisplay({params}: {params : Product}) {
//   const router = useRouter();
//   const [quantity, setQuantity] = useState(1)
//   // const [login, setLogin] = useState(false)

//   const incrementQuantity = () => setQuantity(prev => prev + 1)
//   const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

//   const [product, setProduct] = useState<Product[]>([]);
  
//   console.log(params.id);
//   // console.log(typeof(product.imageUrl));
//   const token = localStorage.getItem('token');
  
//   useEffect(() => {
//     axios.get(`http://localhost:4000/product/${params.id}`)
//       .then(res => {
//         setProduct(res.data);
//         console.log(product);
//       })
//       .catch(err => {
//         console.error('Error fetching product data:', err);
//       });
//   }, [params.id]);
  

//     function addToCart() {
//       if (token) {
//       axios.post(`http://localhost:4000/cart/add`,{
//         productId: params.id,
//         quantity
//       },{
//         headers: {
//             'Authorization':`${token}`
//         }
//       })
//         .then(res => {
//           console.log(res.data);
//         })
//         .catch(err => {
//           console.error('Error adding product to cart:', err);
//         });
//       }
//       else{
//         axios.post(`http://localhost:4000/cart/add`, {productId: params.id,
//           quantity})
//         .then(res => {
//           console.log(res.data); 
//         })
//         .catch(err => {
//           console.error('Error adding product to cart for unauthenticated user:', err); // Handle error
//         });
//       }
//     }
//     function handleLogOut() {
//       localStorage.removeItem('token');
//       router.push('/login');
//     }

//     return (
//       <div className="min-h-screen flex flex-col">

//       <header className="bg-background border-b">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//             <h1 onClick={() => router.push('/')} className="cursor-pointer text-2xl font-bold text-foreground">Marklyt Store</h1>
//           {token ?
//             <div className="flex items-center space-x-4">
//             <Button onClick={handleLogOut} variant="outline">
//               <User className="mr-2 h-4 w-4" /> LogOut
//             </Button>
//             <Button onClick={() => router.push('/cart')}>Cart</Button>
//           </div>
//             :
//             <div className="flex items-center space-x-4">
//               <Button onClick={() => {router.push('/login')}} variant="outline">
//                 <User className="mr-2 h-4 w-4" /> Login
//               </Button>
//               <Button onClick={() => router.push('/signup')}>Sign Up</Button>
//               <Button onClick={() => router.push('/cart')}>Cart</Button>
//             </div>
//           }
//           </div>
//         </header>
//         <main className="flex-grow">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">

//           <div className="flex flex-col-reverse">
//             <div className="w-full aspect-w-1 aspect-h-1">
//               <Image
//                 src={product?.imageUrl || '/placeholder.jpg'}
//                 alt="Product Image"
//                 width={600}
//                 height={600}
//                 className="w-full h-full object-center object-cover sm:rounded-lg"
//               />
//             </div>
//           </div>

//           {/* Right column: Product details */}
//           <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
//             <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.productName}</h1>
            
//             <div className="mt-3">
//               <h2 className="sr-only">Product information</h2>
//               <p className="text-3xl text-gray-900">{product.price}rs</p>
//             </div>

//             {/* Rating */}
//             <div className="mt-3">
//               <div className="flex items-center">
//                 <div className="flex items-center">
//                   {[0, 1, 2, 3, 4].map((rating) => (
//                     <Star
//                       key={rating}
//                       className={`${
//                         rating < 4 ? 'text-yellow-400' : 'text-gray-300'
//                       } h-5 w-5 flex-shrink-0`}
//                       aria-hidden="true"
//                     />
//                   ))}
//                 </div>
//                 <p className="sr-only">4 out of 5 stars</p>
//                 <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
//                   117 reviews
//                 </a>
//               </div>
//             </div>

//             <div className="mt-6">
//               <h3 className="sr-only">Description</h3>
//               <p className="text-base text-gray-700">
//                 {product.description}
//               </p>
//             </div>

//             <div className="mt-6">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-sm font-medium text-gray-900">Size</h3>
//                 <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
//                   Size guide
//                 </a>
//               </div>

//               <Select>
//                 <SelectTrigger className="w-full mt-2">
//                   <SelectValue placeholder="Select size" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="xs">XS</SelectItem>
//                   <SelectItem value="s">S</SelectItem>
//                   <SelectItem value="m">M</SelectItem>
//                   <SelectItem value="l">L</SelectItem>
//                   <SelectItem value="xl">XL</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="mt-6">
//               <div className="flex items-center justify-between">
//               <h3 className="text-sm font-medium text-gray-900">Color</h3>
//             </div>

//             <Select>
//               <SelectTrigger className="w-full mt-2">
//                 <SelectValue placeholder="Select color" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="white">White</SelectItem>
//                 <SelectItem value="gray">Gray</SelectItem>
//                 <SelectItem value="black">Black</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="mt-6">
//             <div className="flex items-center justify-between">
//               <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
//             </div>

//             <div className="flex items-center mt-2">
//               <Button variant="outline" size="icon" onClick={decrementQuantity}>
//                 <Minus className="h-4 w-4" />
//               </Button>
//               <span className="mx-4 text-gray-900">{quantity}</span>
//               <Button variant="outline" size="icon" onClick={incrementQuantity}>
//                 <Plus className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>

//           <div className="mt-10 flex sm:flex-col1">
//             <Button onClick={addToCart} className="max-w-xs flex-1 items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full">
//               <ShoppingCart className="mr-2 h-5 w-5" aria-hidden="true" />
//               Add to cart
//             </Button>

//             <Button
//               type="button"
//               className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
//             >
//               {/* Heart icon */}
//               <svg
//                 className="h-6 w-6 flex-shrink-0"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                 />
//               </svg>
//               <span className="sr-only">Add to favorites</span>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//     </main>
//     </div>
//   )
// }



"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, Minus, Plus, ShoppingCart, User } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Product = {
  id: string;
  productName: string;
  price: number;
  description: string;
  imageUrl?: string; // Changed to optional to handle undefined image URLs
  category: string;
  rating?: number;
};

export default function ProductDisplay({ params }: { params: Product }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null); // Changed to single product object
  const token = localStorage.getItem('token');

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    // Fetch product data based on the product id from the params
    axios
      .get(`http://localhost:4000/product/${params.id}`)
      .then((res) => {
        setProduct(res.data); // Set the fetched product data
        console.log(res.data);
      })
      .catch((err) => {
        console.error('Error fetching product data:', err);
      });
  }, [params.id]);

  function addToCart() {
    if (token) {
      axios
        .post(
          `http://localhost:4000/cart/add`,
          { productId: params.id, quantity },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error('Error adding product to cart:', err);
        });
    } else {
      axios
        .post(`http://localhost:4000/cart/add`, { productId: params.id, quantity })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error('Error adding product to cart for unauthenticated user:', err);
        });
    }
  }

  function handleLogOut() {
    // localStorage.removeItem('token');
    router.push('/login');
  }

  if (!product) {
    return <div>Loading...</div>; // Show loading state while the product data is being fetched
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 onClick={() => router.push('/')} className="cursor-pointer text-2xl font-bold text-foreground">
            Marklyt Store
          </h1>
          {token ? (
            <div className="flex items-center space-x-4">
              <Button onClick={handleLogOut} variant="outline">
                <User className="mr-2 h-4 w-4" /> LogOut
              </Button>
              <Button onClick={() => router.push('/cart')}>Cart</Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button onClick={() => router.push('/login')} variant="outline">
                <User className="mr-2 h-4 w-4" /> Login
              </Button>
              <Button onClick={() => router.push('/signup')}>Sign Up</Button>
              <Button onClick={() => router.push('/cart')}>Cart</Button>
            </div>
          )}
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            <div className="flex flex-col-reverse">
              <div className="w-full aspect-w-1 aspect-h-1">
                <Image
                  src={product.imageUrl || '/placeholder.jpg'}
                  alt="Product Image"
                  width={600}
                  height={600}
                  className="w-full h-full object-center object-cover sm:rounded-lg"
                />
              </div>
            </div>

            {/* Right column: Product details */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.productName}</h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">{product.price}rs</p>
              </div>

              {/* Rating */}
              <div className="mt-3">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <Star
                        key={rating}
                        className={`${
                          rating < 4 ? 'text-yellow-400' : 'text-gray-300'
                        } h-5 w-5 flex-shrink-0`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">4 out of 5 stars</p>
                  <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    117 reviews
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <p className="text-base text-gray-700">{product.description}</p>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </a>
                </div>

                <Select>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xs">XS</SelectItem>
                    <SelectItem value="s">S</SelectItem>
                    <SelectItem value="m">M</SelectItem>
                    <SelectItem value="l">L</SelectItem>
                    <SelectItem value="xl">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                </div>

                <Select>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="gray">Gray</SelectItem>
                    <SelectItem value="black">Black</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                </div>

                <div className="flex items-center mt-2">
                  <Button variant="outline" size="icon" onClick={decrementQuantity}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-4 text-gray-900">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={incrementQuantity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-10 flex sm:flex-col1">
                <Button
                  onClick={addToCart}
                  className="max-w-xs flex-1 items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" aria-hidden="true" />
                  Add to cart
                </Button>

                <Button
                  type="button"
                  className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  {/* Heart icon */}
                  <svg
                    className="h-6 w-6 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
