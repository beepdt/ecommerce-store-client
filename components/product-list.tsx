import { Product } from "@/types";
import NoResult from "./ui/no-result";
import ProductCard from "./ui/product-card";

interface ProductListProps {
  title: string;
  items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  return (
    <div className="space-y-4 dark:text-background">
      {title !== "" && <p className="text-4xl">{title}</p>}

      {items.length === 0 && <NoResult />}

      <div className="grid py-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {items.map((item) => (
         <ProductCard data={item} key={item.id}/>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
