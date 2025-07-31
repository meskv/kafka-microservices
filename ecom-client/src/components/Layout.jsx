import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">

      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">
          <Link to="/">MyShop</Link>
        </div>
        <div className="flex gap-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-black">Home</Link>
          <Link to="/cart" className="hover:text-black">Cart</Link>
          <Link to="/profile" className="hover:text-black">Profile</Link>
        </div>
      </nav>

      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default Layout;
