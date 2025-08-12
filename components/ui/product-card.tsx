"use client";

import { Product } from "@/types";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import useCart from "@/hooks/use-cart";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  const cart = useCart()

  const handleClick = () => {
    router.push(`/products/${data.id}`);
  };

  const onAddToCart = () => {
    
    cart.addItem(data)
  }

  return (
    <motion.div
      
      className="rounded-2xl p-2 shadow-sm  cursor-pointer border border-foreground/20 dark:bg-background/7 space-y-2 flex flex-col min-h-[420px] overflow-hidden transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="shadow-sm aspect-[4/5] rounded-xl flex-1/2 relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Image
          src={data?.images?.[0]?.url}
          alt="product"
          fill
          className="object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-black/10 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <motion.div
        onClick={handleClick}
        className="px-2 py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <motion.p
          className="opacity-70 font-unageo-reg tracking-wide"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {data.category.name}
        </motion.p>

        <motion.p
          className="tracking-wide"
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          {data.name}
        </motion.p>

        <div className="mt-2 flex justify-between items-center text-lg"></div>

        <motion.div
          className="flex justify-between items-center mt-4"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <motion.p
            className="font-unageo-reg leading-none whitespace-nowrap lg:text-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            ₹{data.price}
          </motion.p>

          <motion.div
          onClick={onAddToCart}

            className="flex  items-center justify-center px-4 py-2 rounded-full space-x-2 bg-foreground text-background dark:bg-background/10 transition-colors"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.p
              className="font-unageo-reg text-sm whitespace-nowrap"
              initial={{ x: -2 }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.2 }}
            >
              Add to cart
            </motion.p>
            <motion.div
              whileHover={{ rotate: 15, x: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <ShoppingCartIcon size={16} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
