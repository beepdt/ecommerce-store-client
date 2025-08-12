import getBillboard from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const billboard = await getBillboard("0e047151-e420-454e-b02b-976571eab3bd");
  const products = await getProducts({ isFeatured: true });

  
  return (
    <>
      <div className="space-y-10  pb-10 bg-background dark:bg-foreground">
        <Billboard data={billboard} />
      </div>
      <div className="flex flex-col gap-y-8 px-2 md:px-8 bg-background dark:bg-foreground">
        <div className="sm:w-[15rem] text-6xl md:text-5xl  leading-none tracking-tight dark:text-background">
          <p className="text-start">Featured</p>
          <p className="text-end">Products</p>
        </div>
        
        <ProductList title=""  items={products} />
      </div>
    </>
  );
};

export default HomePage;
