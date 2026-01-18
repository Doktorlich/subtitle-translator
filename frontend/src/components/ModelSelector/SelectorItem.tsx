import classes from "./SelectorItem.module.css";
import type { SelectorItemProps } from "../../models/typesUI.ts";
import { chooseItem, toggleSelectorItem } from "../../store/SelectorSlice.tsx";
import { useAppDispatch } from "../../hooks/hooks.ts";

export default function SelectorItem({
  id,
  label,
  email,
  type,
}: SelectorItemProps) {

  const dispatch = useAppDispatch();
  function handleClickItem() {
    dispatch(chooseItem(label));
    dispatch(toggleSelectorItem())
  }
  return (
    <li className={classes.item} onClick={handleClickItem}>
      <h3 className={classes.title}>{label}</h3>
    </li>
  );
}
