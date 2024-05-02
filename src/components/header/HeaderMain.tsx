import ThemeToggle from "../common/toggle/ThemeToggle";

// TODO: 다크모드 토글 추가
interface HeaderMainProps {
  children?: React.ReactNode;
}

const HeaderMain = ({ children }: HeaderMainProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="w-auto py-4 text-4xl font-bold">Music</h1>
      <ThemeToggle />
    </div>
  );
};

export default HeaderMain;
