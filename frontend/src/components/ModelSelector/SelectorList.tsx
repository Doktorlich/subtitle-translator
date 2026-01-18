import classes from "./SelectorList.module.css";
import SelectorItem from "./SelectorItem.tsx";

const TESTING_API = [
  {
    id: "ds-acc-1",
    label: "DeepSeek (Main)",
    email: "test1@mail.ru",
    type: "deepseek",
  },
  {
    id: "ds-acc-2",
    label: "DeepSeek (Reserve)",
    email: "test2@mail.ru",
    type: "deepseek",
  },
  {
    id: "oa-premium",
    label: "GPT-4o (Work)",
    email: "admin@corp.com",
    type: "openai",
  },
];

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
