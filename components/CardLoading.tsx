import React from "react";

const CardLoading = () => {
  return (
    <div className="border border-blue-300 shadow rounded-md p-2 max-w-sm w-full mx-auto">
      <div className="animate-pulse">
        <div className=" flex space-x-4 flex-row">
          <div className="rounded-full bg-slate-700 h-[72px] w-11" />
          <div className="flex-1 space-y-3 py-1">
            <div className="h-2 bg-slate-700 rounded" />
            <div className="h-12 bg-slate-700 rounded" />
          </div>
        </div>
        <div className="bg-slate-700 h-60 w-full" />
        <div className="bg-slate-700 h-[68px] w-full" />
        <div className="bg-slate-700 h-[32px] w-full" />
      </div>
    </div>
  );
};

export default CardLoading;
