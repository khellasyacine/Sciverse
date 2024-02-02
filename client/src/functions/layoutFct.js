import { MdGroups } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { navLinks } from "../constants";

export const getTitleIcon = (title) => {
  switch (title) {
    case "Home":
      return navLinks[0].icon;
    case "Favorite":
      return navLinks[1].icon;
    case "History":
      return navLinks[2].icon;
    case "Categories":
      return navLinks[3].icon;
    case "Moderators":
      return MdGroups;
    case "Settings":
      return IoSettings;
  }
};

export const filterLabel = (filterTable) => {
  let isOneFilterUnchecked = false;
  filterTable.map((item) => {
    if (!item.checked) {
      isOneFilterUnchecked = true;
    }
  });
  if (isOneFilterUnchecked) return "Custom";
  else return "All";
};
