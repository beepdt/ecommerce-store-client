import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Filter from "@/components/filter";
import Dropdown from "@/components/ui/dropdown-menu";
import ProductCard from "@/components/ui/product-card";
import { FilterIcon } from "lucide-react";

export const revalidate = 0;
interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const promisedParam = await params
  const products = await getProducts({
    categoryId: promisedParam.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });

  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(promisedParam.categoryId);
  return (
    <div className="dark:text-background px-6">
      <Billboard data={category.billboard} />
      <div className="py-8 lg:px-8">
        <div className="block md:hidden">
          <Dropdown
            className=""
            trigger={
              <div className="flex items-center gap-2 border rounded-2xl p-2">
                <FilterIcon className="w-4 h-4" />
                <p className="font-unageo-reg text-lg">Filters</p>
              </div>
            }
          >
            <div className="border dark:border-background/40 shadow-2xl flex flex-col w-[300px] h-[240px] overflow-y-auto rounded-2xl p-4 bg-background dark:bg-neutral-800 ">
              <Filter name="Sizes" data={sizes} valueKey="sizeId" type="size" />
              <Filter
                name="Colors"
                data={colors}
                valueKey="colorId"
                type="color"
              />
            </div>
          </Dropdown>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          <div className="hidden col-span-1 md:block border border-foreground/7 dark:border-none shadow-sm dark:bg-background/7 rounded-2xl px-4 py-4">
            <Filter name="Sizes" data={sizes} valueKey="sizeId" type="size" />
            <Filter
              name="Colors"
              data={colors}
              valueKey="colorId"
              type="color"
            />
          </div>

          <div className="md:col-span-2   lg:col-span-3 xl:col-span-4 mt-6 md:mt-0 ">
            {products.length === 0 && (
              <div className=" h-full flex items-center justify-center">
                <p className="font-unageo-reg opacity-50">No result(s)</p>
              </div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {products.map((product)=>(
                <ProductCard key={product.id} data={product}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
