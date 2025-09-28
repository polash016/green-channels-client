import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes();
export const useAppSelector = useSelector.withTypes();

export const useDebounced = ({ searchQuery, delay }) => {
  const [debouncedValue, setDebouncedValue] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  return debouncedValue;
};
