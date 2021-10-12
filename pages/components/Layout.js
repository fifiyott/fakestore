import NaviBar from "./Navigation-bar";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <NaviBar />
      {children}
    </div>
  );
};

export default Layout;
