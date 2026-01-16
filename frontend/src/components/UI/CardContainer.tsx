import classes from "./CardContainer.module.css";
import type { CardContainer } from "../../models/typesUI.ts";


export default function CardContainer({ title, children }:CardContainer) {
  return (
    <section className={classes.container}>
      <h3 className={classes.title}>{title}</h3>
      {children}
    </section>
  );
}
