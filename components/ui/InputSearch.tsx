import React, { useCallback, useState } from "react";
import { debounce } from "lodash";

export interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  loading?: boolean | undefined;
  setSearch: (e: any) => void;
}
const InputSearch: React.FC<Props> = (props) => {
  const { className, disabled, loading, setSearch, ...other } = props;
  const [value, setValue] = useState("");
  const debounceFn = useCallback(debounce(handleDebounceFn, 250), []);
  let classNameDefault =
    "block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
    (className ? ` ${className}` : "");
  if (disabled) classNameDefault += " bg-[#283543] text-[#626C76] cursor-not-allowed";
  const handleChangeSearch = (inputValue: string) => {
    setValue(inputValue);
    if (inputValue.length > 2 || inputValue === "") debounceFn(inputValue);
  };
  function handleDebounceFn(inputValue: string) {
    setSearch(inputValue);
  }
  return (
    <div className="relative">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input onChange={(e) => handleChangeSearch(e.target.value)} value={value} className={classNameDefault} {...other} />
    </div>
  );
};

export default InputSearch;
