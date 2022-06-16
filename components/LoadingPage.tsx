import React, { useEffect, useState } from "react";

interface Props {
  isLoading?: undefined | boolean;
  timeout?: undefined | number;
  render?: undefined | number;
}
const LoadingPage: React.FC<Props> = ({ isLoading = undefined, timeout = undefined, render = 0 }) => {
  const [loading, setLoading] = useState(isLoading);
  useEffect(() => {
    if (typeof timeout === "number" && render > 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, timeout);
    }
  }, [render]);
  useEffect(() => {
    if (typeof timeout === "undefined") {
      setLoading(isLoading);
    }
  }, [isLoading]);
  return loading ? (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex">
      <div className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40 flex justify-center items-center flex-col gap-2">
        <div className="flex items-center justify-center ">
          <div className="w-40 h-40 border-t-4 border-b-4 border-red-500 rounded-full animate-spin"></div>
        </div>
        <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default LoadingPage;
