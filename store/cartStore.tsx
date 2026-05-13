import { API } from '@/lib/urls';
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
    error:string|null;
    addCart:(data:any)=>Promise<void>
    getAllCart:(userId:string)=>Promise<void>;
    removeCart:(id:string)=>Promise<void>;
    updateQuantity: (id: string, quantity: number) => void;
    updateCart:(id:string,data:any)=>Promise<void>;
    clearCart:(id:string)=>Promise<void>;
}
export const useCartStore=create<CartState>((set,get)=>({
    cartItems:[],
    error:null,
    addCart:async(data:any)=>{
       try {
       const cart=  await  fetch(`${API.addCart}`, {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
});
          const res=await cart.json();
          
          if (!cart.ok) {
      throw new Error(res.message);
    }
          set({
            error:null})
       } catch (err:any) {
        console.log(err,'present in the store')
        set({error:err.message})
        throw err;
       }
    },
    getAllCart:async(userId:string)=>{
        try {
            const res=await fetch(`${API.getAllCart}${userId}`);
        const data=await res.json();
        console.log(data,'response')
        set({cartItems:data.data});
        } catch (error) {
            console.error(error);
        }
    },
    removeCart:async(id:string)=>{
        try {
              const data= await fetch(`${API.deleteCart}${id}`,{
      method:"DELETE"
     });
     set((state)=>({cartItems:state.cartItems.filter(item=>item._id!==id)}))
        } catch (error) {
            console.log(error)
        }
    },
    clearCart:async(id:string)=>{
      try {
        console.log(id,'from clearcart');
        const res=await fetch(`${API.clearCart}${id}`,{
          method:"DELETE",
        })
        set({cartItems:[],error:null})
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
      await  fetch(`${API.updateCart}${id}`, {
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
    set((state) => ({
  cartItems: state.cartItems.map((item) =>
    item._id === id
      ? { ...item, quantity: data.quantity }
      : item
  ),
}));
  } catch (error) {
     console.log(error);
  }
}
}))