import classes from "./SelectorTrigger.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";
import { toggleSelectorItem } from "../../store/SelectorSlice.tsx";

export default function SelectorTrigger() {
  const selectorTitle = useAppSelector((state) => state.selector.selectorTitle);

  const dispatch = useAppDispatch()
  function handleClickSelector(){
    dispatch(toggleSelectorItem())
  }
  const isActive = useAppSelector((state) => state.selector.isActive);

  return (
    <div className={classes["selector-trigger"]} onClick={handleClickSelector}>
      <p>{selectorTitle}</p>
      <span>
        <svg
          transform={isActive ? "rotate(180)" : ""}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
