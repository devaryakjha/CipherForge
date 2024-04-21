import { ModeToggle } from "@/components/ui/theme-switcher";

const Header = () => {
  return (
    <header className="fixed top-8 left-8 right-8 flex items-center justify-end">
      <ModeToggle />
    </header>
  );
};

export default Header;
