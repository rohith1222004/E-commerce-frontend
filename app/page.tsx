// "use client";

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { Star, ChevronLeft, ChevronRight, User } from 'lucide-react';

// import Link from 'next/link';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// type Product = {
//   _id: string;
//   productName: string;
//   price: number;
//   description: string;
//   imageUrl: string;
//   category: string;
//   rating?: number;
// };

// export default function ProductListing() {
//   const router = useRouter();
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   // const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
//   const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [sortBy, setSortBy] = useState<string>('name');
//   // const sortBy = ['name', 'price', 'rating'];
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     axios.get<Product[]>('http://localhost:4000/product')
//       .then(res => {
//         setProducts(res.data);
//       })
//       .catch(err => {
//         console.error("Error fetching products:", err);
//       });
//   }, []);
  
//   const token = localStorage.getItem('token');
  
//   function handleAddToCart(productId: string) {
//     axios.post('http://localhost:4000/cart/add', {
//       productId: productId,
//       quantity: 1
//     }, {
//       headers: {
//         'Authorization': `${token}`
//       }
//     })
//       .then(res => {
//         console.log(res.data);
//       })
//       .catch(err => {
//         console.error('Error adding product to cart:', err);
//       });
//   }

//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(products.length / itemsPerPage);

//   // const filteredProducts = products
//   //   .filter(product =>
//   //     {
//   //       console.log('====================================');
//   //       console.log(product);
//   //       console.log('====================================');
//   //     product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
//   //     product.price >= priceRange[0] && product.price <= priceRange[1]
//   //   }
//   //   )
//   //   .sort((a, b) => {
//   //     if (sortBy === 'price') return a.price - b.price;
//   //     if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
//   //     return a.name.localeCompare(b.name);
//   //   });

//   // const paginatedProducts = filteredProducts.slice(
//   //   (currentPage - 1) * itemsPerPage,
//   //   currentPage * itemsPerPage
//   // );
//   // console.log('Paginated products:', paginatedProducts);

//   const filteredProducts = products
//   .filter(product =>
//     product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     product.price >= priceRange[0] && product.price <= priceRange[1]
//   )
//   .sort((a, b) => {
//     if (sortBy === 'price') return a.price - b.price;
//     if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
//     return a.productName.localeCompare(b.productName);
//   });

// console.log('Filtered products:', filteredProducts);

// const start = (currentPage - 1) * itemsPerPage;
// const end = currentPage * itemsPerPage;
// console.log(`Slicing from index ${start} to ${end}`);

// const paginatedProducts = filteredProducts.slice(start, end);

// console.log('Paginated products:', paginatedProducts);

//   function handleLogOut() {
//     localStorage.removeItem('token');
//     router.push('/login');
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <header className="bg-background border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-foreground">Marklyt Store</h1>
//           {token ? (
//             <div className="flex items-center space-x-4">
//               <Button onClick={handleLogOut} variant="outline">
//                 <User className="mr-2 h-4 w-4" /> LogOut
//               </Button>
//               <Button onClick={() => router.push('/cart')}>Cart</Button>
//             </div>
//           ) : (
//             <div className="flex items-center space-x-4">
//               <Button onClick={() => { router.push('/login') }} variant="outline">
//                 <User className="mr-2 h-4 w-4" /> Login
//               </Button>
//               <Button onClick={() => router.push('/signup')}>Sign Up</Button>
//               <Button onClick={() => router.push('/cart')}>Cart</Button>
//             </div>
//           )}
//         </div>
//       </header>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <h1 className="text-3xl font-bold text-foreground mb-8">Our Products</h1>

//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
//           <div className="w-full md:w-1/3">
//             <Input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           {/* <div className="w-full md:w-1/3">
//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="name">Name</SelectItem>
//                 <SelectItem value="price">Price</SelectItem>
//                 <SelectItem value="rating">Rating</SelectItem>
//               </SelectContent>
//             </Select>
//           </div> */}
//           <div className="w-full md:w-1/3 space-y-2">
//             <p className="text-sm font-medium text-foreground">Price Range: ${priceRange[0]} - ${priceRange[1]}</p>
//             <Slider
//               min={0}
//               max={1000}
//               step={1}
//               value={priceRange}
//               onValueChange={setPriceRange}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {paginatedProducts.map((product) => (
//             <div key={product._id} className="bg-card rounded-lg shadow-md overflow-hidden">
//               <Link href={`/product/${product._id}`}>
//                 <Image
//                   src={product.imageUrl || '/placeholder.jpg'}
//                   alt={product.productName}
//                   width={300}
//                   height={300}
//                   className="w-full h-48 object-cover cursor-pointer"
//                 />
//               </Link>
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-foreground">{product.productName}</h3>
//                 <p className="text-primary font-bold mt-2">${product.price}</p>
//                 <div className="flex items-center mt-2">
//                   {Array(5).fill(null).map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`h-5 w-5 ${i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
//                       fill="currentColor"
//                     />
//                   ))}
//                 </div>
//                 <Button 
//                   onClick={() => handleAddToCart(product._id)}
//                   className="w-full mt-4"
//                 >
//                   Add to Cart
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-center items-center space-x-4 mt-8">
//           <Button
//             variant="outline"
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             <ChevronLeft className="h-4 w-4 mr-2" />
//             Previous
//           </Button>
//           <span className="text-foreground">
//             Page {currentPage} of {totalPages}
//           </span>
//           <Button
//             variant="outline"
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//           >
//             Next
//             <ChevronRight className="h-4 w-4 ml-2" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, User } from 'lucide-react';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Product = {
  _id: string;
  productName: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  rating?: number;
};

export default function ProductListing() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get<Product[]>('http://localhost:4000/product')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
      });
  }, []);
  
  const token = localStorage.getItem('token');
  
  function handleAddToCart(productId: string) {
    axios.post('http://localhost:4000/cart/add', {
      productId: productId,
      quantity: 1
    }, {
      headers: {
        'Authorization': `${token}`
      }
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error('Error adding product to cart:', err);
      });
  }

  const itemsPerPage = 8;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const filteredProducts = products
    .filter(product =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return a.productName.localeCompare(b.productName);
    });

  const start = (currentPage - 1) * itemsPerPage;
  const end = currentPage * itemsPerPage;

  const paginatedProducts = filteredProducts.slice(start, end);

  function handleLogOut() {
    localStorage.removeItem('token');
    router.push('/login');
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Marklyt Store</h1>
          {token ? (
            <div className="flex items-center space-x-4">
              <Button onClick={handleLogOut} variant="outline">
                <User className="mr-2 h-4 w-4" /> LogOut
              </Button>
              <Button onClick={() => router.push('/cart')}>Cart</Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button onClick={() => { router.push('/login') }} variant="outline">
                <User className="mr-2 h-4 w-4" /> Login
              </Button>
              <Button onClick={() => router.push('/signup')}>Sign Up</Button>
              <Button onClick={() => router.push('/cart')}>Cart</Button>
            </div>
          )}
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Our Products</h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/3">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus-visible:outline-none"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div className="w-full md:w-1/3 space-y-2">
            <p className="text-sm font-medium text-foreground">Price Range: ${priceRange[0]} - ${priceRange[1]}</p>
            <Slider
              min={0}
              max={1000}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <div key={product._id} className="bg-card rounded-lg shadow-md overflow-hidden">
              <Link href={`/product/${product._id}`}>
                <Image
                  src={product.imageUrl || '/placeholder.jpg'}
                  alt={product.productName}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover cursor-pointer"
                />
              </Link>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground">{product.productName}</h3>
                <p className="text-primary font-bold mt-2">${product.price}</p>
                <div className="flex items-center mt-2">
                  {Array(5).fill(null).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <Button 
                  onClick={() => handleAddToCart(product._id)}
                  className="w-full mt-4"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center space-x-4 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span className="text-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
