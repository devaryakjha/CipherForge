import { ModeToggle } from "@/components/ui/theme-switcher";

const Header = () => {
  return (
    <header className="fixed top-2 right-2 left-2 sm:top-8 sm:left-8 sm:right-8 flex items-center justify-end">
      <ModeToggle />
    </header>
  );
};

export default Header;
