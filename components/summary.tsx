"use client";
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Button from "./ui/button";
import toast from "react-hot-toast";
import useCart from "@/hooks/use-cart";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      }
    );

    window.location = response.data.url;
  };

  useEffect(()=>{
    if(searchParams.get("success")){
        toast.success("Payment completed");
        removeAll()
    }
    if(searchParams.get("cancelled")){
        toast.error("Something went wrong")
    }
  },[searchParams, removeAll])

  return (
    <div className=" w-full py-2 rounded-md px-4 shadow-md border dark:border-none border-foreground/10 dark:bg-background/4">
      <p className="text-xl">Order details</p>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-lg">Order total</p>
          <p className="text-xl"> ₹ {totalPrice}</p>
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="text-background mt-12 w-full dark:text-foreground p-2 rounded-xl dark:bg-background"
      >
        <p className="font-unageo-reg"> Checkout</p>
      </Button>
    </div>
  );
};

export default Summary;
