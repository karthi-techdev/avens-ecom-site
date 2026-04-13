import { toast } from 'react-toastify';
import {create} from 'zustand';
interface ProductDetails{
     name: string;
  price: number;
  thumbnail: string;
  stockQuantity: number;
  discountPrice: number;
  shortDescription: string;
}
interface CartItems{
     _id: string;
  quantity: number;
  productId: ProductDetails;
}
interface CartState{
    cartItems:CartItems[];
    addCart:(data:any)=>Promise<void>
    getAllCart:(userId:string)=>Promise<void>;
    removeCart:(id:string)=>Promise<void>;
    updateQuantity: (id: string, quantity: number) => void;
    updateCart:(id:string,data:any)=>Promise<void>;
}
export const useCartStore=create<CartState>((set,get)=>({
    cartItems:[],
    addCart:async(data:any)=>{
       try {
         await  fetch("http://localhost:5000/api/v1/cart/addtocart", {
  method: "POST",
  body: JSON.stringify({
    userId: data.userId,
    quantity:data.quantity,
    'color':data.selectedColor,
    'size':data.selectedSize,
    'price':data.totalPrice,
    'productId':data.product._id
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
});
    const res=await fetch(`http://localhost:5000/api/v1/cart/${data.userId}`);
        const updatedCart=await res.json();
        set({cartItems:updatedCart.data})
       } catch (error) {
        console.error(error);
       }
    },
    getAllCart:async(userId:string)=>{
        try {
            const res=await fetch(`http://localhost:5000/api/v1/cart/${userId}`);
        const data=await res.json();
        set({cartItems:data.data});
        } catch (error) {
            console.error(error);
        }
    },
    removeCart:async(id:string)=>{
        try {
              const data= await fetch(`http://localhost:5000/api/v1/cart/${id}`,{
      method:"DELETE"
     });
     set((state)=>({cartItems:state.cartItems.filter(item=>item._id!==id)}))
        } catch (error) {
            console.log(error)
        }
    },
    updateQuantity: (id, quantity) => {
  set((state) => ({
    cartItems: state.cartItems.map((item) =>
      item._id === id ? { ...item, quantity } : item
    ),
  }));
},
updateCart:async(id:string,data:any)=>{
  try {
    console.log(id,data,'in cart store')
      await  fetch(`http://localhost:5000/api/v1/cart/updateCart/${id}`, {
  method: "PATCH",
  body: JSON.stringify({
    userId: data.userId,
    quantity:data.quantity,
    'price':data.price
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
});
    const res=await fetch(`http://localhost:5000/api/v1/cart/${data.userId}`);
        const updatedCart=await res.json();
        set({cartItems:updatedCart.data})
  } catch (error) {
     console.log(error);
  }
}
}))