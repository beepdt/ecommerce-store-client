"use client";
import qs from "query-string";
import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "./ui/button";
import { cn } from "@/lib/utils";

interface FilterProps {
  data: (Color | Size)[];
  name: string;
  valueKey: string;
  type: "color" | "size";
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey, type }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="mb-8">
      <p className="text-lg md:text-xl mb-2 font-unageo-bold">{name}</p>
      <div className="gap-4 flex md:flex-col">
        {data.map((filter) => (
          <div key={filter.id}>
            <Button 
           onClick={()=>onClick(filter.id)}
            className={cn("border border-foreground/20 dark:border-none p-2 w-full rounded-xl bg-transparent dark:bg-foreground hover:bg-foreground hover:text-background dark:hover:bg-background/10 ",
              selectedValue === filter.id && "bg-foreground text-background dark:bg-background/10"
            )}>
              <div className="flex justify-between gap-2 items-center">
                <p className="font-unageo-reg text-sm">{filter.name}</p>
                {type === "size" && (
                  <p className="opacity-50 hidden md:block">{filter.value}</p>
                )}

                {type === "color" && (
                  <div
                    style={{ backgroundColor: filter.value }}
                    className="w-6 h-6 rounded-full border"
                  />
                )}
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
