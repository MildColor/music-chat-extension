interface LayoutProps {
  children?: React.ReactNode;
}

const LayoutMain = ({ children }: LayoutProps) => {
  return <div className="container h-fit w-96 px-4 py-4">{children}</div>;
};

export default LayoutMain;
