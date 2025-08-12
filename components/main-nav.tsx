"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Dropdown from "./ui/dropdown-menu";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <Dropdown
      trigger={
        <h1 className="lg:text-lg text-sm font-unageo-reg cursor-pointer">Categories</h1>
      }
    >
      <div className="bg-background dark:bg-foreground border border-foreground/50 rounded-xl overflow-hidden">
        <p className="font-unageo-reg p-2 border-b ">Product Categories</p>
        <nav className=" flex flex-col min-w-[210px]   items-center ">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm border-b w-full transition-colors hover:text-foreground dark:hover:text-background duration-200",
              route.active
                ? "text-foreground dark:text-background"
                : "text-foreground/65 dark:text-background/60"
            )}
          >
            <h1 className="lg:text-lg text-sm py-2 px-2 font-unageo-bold">
              {route.label}
            </h1>
          </Link>
        ))}
      </nav>
      </div>
      
    </Dropdown>
  );
};

export default MainNav;
