"use client";

import {  ShoppingCartIcon } from "lucide-react";
import Button from "./ui/button";
import { useEffect, useState } from "react";
import ThemeButton from "./theme-button";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter()

  const cart = useCart()


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center space-x-4">
     <ThemeButton/>
      <Button 
      onClick={()=>router.push("/cart")}
      className="flex items-center rounded-full bg-[#231005] dark:bg-[#eaefda] text-background dark:text-foreground px-4 py-2 cursor-pointer">
        <ShoppingCartIcon size={20} />
        <p className="ml-2 text-sm">
          {cart.items.length}
        </p>
      </Button>
    </div>
  );
};

export default NavbarActions;
