import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCatgories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";

const Navbar = async () => {
  const categories = await getCatgories();

  return (
    <div className=" bg-background dark:bg-foreground dark:text-[#faf9f6]">
      <div className="relative px-2 sm:px-6 lg:px-8 h-16 flex items-center">
        <Link
          href="/"
          className=" pr-6 flex lg:ml-0 gap-x-2 items-center h-full"
        >
          <p className="font-integral">Beepdt</p>
        </Link>
        <MainNav data={categories} />
        <NavbarActions />
      </div>
    </div>
  );
};

export default Navbar;
