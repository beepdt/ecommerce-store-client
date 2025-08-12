import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/product-list";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);

  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });

  return (
    <div className="dark:text-background px-2 md:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-2 py-8 space-y-8 border-b border-foreground/10 dark:border-background/10">
        <div className=" flex items-center justify-center lg:items-start lg:justify-normal" >
            <Gallery images={product.images}/>
        </div>
        <div className="">
            <Info data={product}/>
        </div>
      </div>
      {/*@ts-ignore */}
      <div className="sm:w-[16rem] text-6xl md:text-5xl pt-8 leading-none tracking-tight">
        <p className="text-start">Related</p>
        <p className="text-end">Products</p>
      </div>
      {/*@ts-ignore */}
      <ProductList items={suggestedProducts} />
    </div>
  );
};

export default ProductPage;
