import { useCallback, useEffect, useRef, useState } from "react";

const SearchComponent = () => {
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const [isSuggestion, setIsSuggeisSuggestion] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionRef = useRef(null);
  const [debounceValue, setDebounceValue] = useState(input);

  const fetchProducts = useCallback(async (input) => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${input}`
      );
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(input);
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [input]);

  useEffect(() => {
    if (debounceValue) {
      fetchProducts(debounceValue);
    } else {
      setProducts([]);
    }
  }, [debounceValue, fetchProducts]);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        isSuggestion &&
        suggestionRef.current &&
        !suggestionRef.current.contains(e.target)
      ) {
        setIsSuggeisSuggestion(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  });

  const handleOnClick = (title) => {
    setInput(title);
    setIsSuggeisSuggestion(false);
  };

  //   const handleBlur = (e) => {
  //     if (!suggestionRef.current.contains(e.target)) {
  //       setIsSuggeisSuggestion(false);
  //     }
  //   };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        setSelectedIndex((prev) => (prev < products.length - 1 ? prev + 1 : 0));
        break;

      case "ArrowUp":
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : products.length - 1));
        break;

      case "Enter":
        setInput(products[selectedIndex].title);
        setIsSuggeisSuggestion(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div>
      <div className="p-4 min-w-[500px] w-1/2" ref={suggestionRef}>
        <input
          type="search"
          placeholder="Search products..."
          className="border-1 px-4 py-2 w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsSuggeisSuggestion(true)}
          //   onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        {isSuggestion && (
          <div className="flex flex-col bg-gray-200 max-h-96 overflow-y-auto">
            {products?.map((product, index) => {
              return (
                <span
                  role="option"
                  key={product.id}
                  className={`p-2 cursor-pointer hover:bg-gray-300 ${
                    selectedIndex === index ? "bg-gray-300" : "bg-gray-200"
                  }`}
                  onClick={() => handleOnClick(product.title)}
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
};

export default SearchComponent;
