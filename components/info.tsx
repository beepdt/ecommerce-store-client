"use client"

import { Product } from "@/types";
import Button from "./ui/button";
import { ShoppingCartIcon } from "lucide-react";
import useCart from "@/hooks/use-cart";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {

  const cart = useCart()

  const onAddToCart = () => {
    
    cart.addItem(data)
  }

  return (
    <div>
      <div className="py-2 px-4">
        <p className="text-4xl md:text-5xl lg:text-6xl">{data.name}</p>
        <p className="text-foreground/60 text-3xl dark:text-background/60 border-b pb-2 border-foreground/30 dark:border-background/30">
          {data.category.name}
        </p>
        <div className="mt-3 items-end justify-between">
          <p className="text-2xl md:text-4xl lg:text-5xl">₹ {data.price}</p>
        </div>
        <div className="flex items-center gap-x-4 py-4 ">
          <p className="text-2xl leading-none font-unageo-bold">Size:</p>
          <p className="text-xl leading-none border p-2 rounded-xl  dark:text-background">
            {" "}
            {data.size.value}
          </p>
        </div>
        <div className="flex items-center gap-x-4 pb-2">
          <p className="text-2xl font-unageo-bold leading-none">Color</p>
          <div
            className="w-8 h-8 rounded-full border-2"
            style={{ backgroundColor: data.color.value }}
          />
        </div>
        <div className="flex justify-between md:justify-normal mt-4 mb-4 space-x-4 items-center">
          <Button 
          onClick={onAddToCart}
          className=" bg-transparent border group h-12 items-center flex space-x-4  rounded-full">
            <p className="font-unageo-reg ">Add to Cart</p>
            <ShoppingCartIcon className="group-hover:rotate-23 transition-transform duration-300" />
          </Button>
          <Button className="text-background flex space-x-4 dark:text-foreground dark:bg-background rounded-full">
            <p className="font-unageo-reg ">Buy now</p>
          </Button>
        </div>

        <p className="text-sm md:text-lg pt-4 border-t font-unageo-reg border-foreground/30 dark:border-background/30">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default Info;
