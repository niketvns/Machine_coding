import { useEffect, useState } from "react";
import "./App.css";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const [isSuggestion, setIsSuggestion] = useState(false);
  const [cacheApiResults, setCacheApiResults] = useState({});

  const debounceValue = useDebounce(input, 500);

  const fetchProducts = async (input) => {
    if (cacheApiResults[input]) {
      setProducts(cacheApiResults[input]);
      console.log("Showing Cached Result: " + input);
      return;
    }

    console.log("Calling API: " + input);

    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${input}`
      );
      const data = await res.json();
      console.log(data?.products);
      setProducts(data?.products);
      setCacheApiResults((prevCache) => ({
        ...prevCache,
        [input]: data?.products,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (input) {
      fetchProducts(input);
    } else {
      setProducts([]);
    }
  }, [debounceValue]);

  const handleOptionClick = (option) => {
    setInput(option);
  };

  return (
    <div className="px-6 py-2">
      <div className="relative w-2xl">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search products..."
          className="px-4 py-2 border-1 text-2xl w-full focus:outline-1 rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={() => setIsSuggestion(false)}
          onFocus={() => setIsSuggestion(true)}
        />
        {isSuggestion && (
          <div className="bg-gray-200 absolute left-0 top-full w-full flex flex-col max-h-72 overflow-y-auto">
            {input &&
              products?.map((product) => {
                return (
                  <span
                    role="option"
                    onClick={() => handleOptionClick(product.title)}
                    key={product?.id}
                    value={product?.id}
                    className="p-2 w-full hover:bg-gray-300 cursor-pointer"
                  >
                    {product.title}
                  </span>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
