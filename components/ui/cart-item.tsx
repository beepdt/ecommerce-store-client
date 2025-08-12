"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import { X } from "lucide-react";

import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import Button from "./button";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex py-4 shadow-md dark:bg-background/4 rounded-lg px-4 border-foreground/50 dark:border-background/50 gap-3">
      <div className="relative aspect-square h-20 md:h-48 dark:border-2 rounded-md overflow-hidden">
        <Image
          className="object-cover object-center"
          fill
          src={data.images[0].url}
          alt=""
        />
      </div>
      <div className="flex flex-1 justify-between">
        <div className="flex flex-col  gap-1">
          <p className="font-unageo-reg text-lg">{data.name}</p>
          <p className="opacity-50 text-sm">{data.category.name}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-unageo-reg">{data.color.name}</p>
            <div
              className="w-4 h-4 rounded-full border"
              style={{ backgroundColor: data.color.value }}
            />
          </div>
          <p className="text-sm font-unageo-reg mb-5">Size: {data.size.name}</p>
          <p className="text-sm font-unageo-reg opacity-55">
            {data.description}
          </p>
        </div>
        <div className="flex flex-col  justify-between items-end gap-2">
          <Button
            onClick={onRemove}
            className="text-background dark:border rounded-full p-1.5"
          >
            <X className="w-3 h-3" />
          </Button>
          <p className="font-unageo-bold text-2xl md:text-4xl">₹ {data.price}</p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
