"use client"

import Summary from "@/components/summary"
import CartItem from "@/components/ui/cart-item"
import useCart from "@/hooks/use-cart"
import { useEffect, useState } from "react"

const CartPage = () => {

    const [isMounted,setIsMounted] = useState(false)

    const cart = useCart()
    

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }
    
    return (
        <div className="dark:text-background px-4 mt-6 md:px-6">
            <p className="text-3xl md:text-4xl">Your cart</p>
            <div className="mt-12 lg:grid lg:grid-cols-12 lig:items-start gap-4">
                <div className="flex lg:hidden">
                    <Summary/>
                </div>
                <div className="lg:col-span-7">
                    {cart.items.length === 0 && <p className="opacity-50 text-2xl">Your cart is empty</p>}
                    <ul className="gap-2 flex flex-col py-4">
                        {cart.items.map((item)=>(
                            <CartItem key={item.id} data={item}/>
                        ))}
                    </ul>
                </div>
                <div className="hidden lg:block lg:col-span-5 py-4">
                    <Summary/>
                </div>
            </div>
        </div>
    )
}

export default CartPage