import { useEffect, useState } from "react";

export const useDebounce = (input, delay) => {
  const [debounceInput, setDebounceInput] = useState(input);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceInput(input);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [input, delay]);

  return debounceInput;
};
