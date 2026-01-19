import classes from "./SelectorList.module.css";
import SelectorItem from "./SelectorItem.tsx";
import { TESTING_API } from "../../constants/constants.ts";

export default function SelectorList({}) {
  return (
    <ul className={classes["selector-list"]}>
      {TESTING_API.map((item) => (
        <SelectorItem
          key={item.id}
          id={item.id}
          label={item.label}
          email={item.email}
          type={item.type}
        />
      ))}
    </ul>
  );
}
