import { useTheme } from "@/components/ui/theme-provider";
import { Toggle } from "@/components/ui/toggle";

// const LOCALSTORAGE_THEME_KEY = "vite-ui-theme";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleClickToggle = () => {
    const chageTheme = theme === "light" ? "dark" : "light";
    setTheme(chageTheme);
  };

  return (
    <Toggle variant="outline" onPressedChange={handleClickToggle}>
      {theme.toUpperCase()}
    </Toggle>
  );
};

export default ThemeToggle;
