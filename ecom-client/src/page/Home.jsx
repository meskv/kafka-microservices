import Pay from "../components/Pay";

const Home = () => {
  const cart = [
    {
      id: 1,
      name: "Product 1",
      description: "This is a sample product",
      image: "/product1.png",
      price: 29.99,
    },
    {
      id: 2,
      name: "Product 2",
      description: "Cap",
      image: "/product2.png",
      price: 59.49,
    },
    {
      id: 3,
      name: "Product 3",
      description: "T-Shirt",
      image: "/product3.png",
      price: 39.49,
    },
  ];

  return (
    <div className="mb-16">
      <h1 className="text-2xl font-bold">Cart Products</h1>
      <div className="flex flex-col lg:flex-row justify-between gap-16 mt-16">
        <div className="flex flex-col gap-16 w-full lg:w-2/3">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                width={300}
                height={200}
                className="rounded-lg"
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <div className="flex gap-2 items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-800">
                    ₹{item.price.toFixed(2)}
                  </h2>
                  <div className="flex items-center bg-red-100 rounded-md p-1 cursor-pointer">
                    <span className="text-xs text-red-500">X</span>
                    <span className="text-[10px] text-red-500 px-1">Remove</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-1/3">
          <Pay cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default Home;
