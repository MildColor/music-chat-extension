interface LayoutProps {
  children?: React.ReactNode;
}

const LayoutMain = ({ children }: LayoutProps) => {
  return (
    <div className="container flex flex-col w-96 h-dvh px-4 py-4">
      {children}
    </div>
  );
};

export default LayoutMain;
