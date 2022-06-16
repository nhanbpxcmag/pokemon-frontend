import React from "react";

const Stats = ({ children, statName }) => {
  switch (statName) {
    case "hp":
      statName = "HP";
      break;
    case "attack":
      statName = "ATK";
      break;
    case "defense":
      statName = "DEF";
      break;
    case "special-attack":
      statName = "SpA";
      break;
    case "special-defense":
      statName = "SpA";
      break;
    case "speed":
      statName = "SPD";
      break;
    case "tdt":
      statName = "TDT";
      break;
    default:
      statName = null;
  }

  return (
    <div className="tag-stats bg-gray-50 flex flex-col p-2 rounded-3xl gap-1">
      <div className={statName + " tag-stat-name text-[10px] rounded-full p-1 font-extrabold flex justify-center"}>{statName}</div>
      <p className="text-sm font-medium flex justify-center">{children.base_stat}</p>
    </div>
  );
};

export default Stats;
