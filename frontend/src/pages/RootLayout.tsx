import { Fragment } from "react";
import Header from "@/components/Header.js";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
}
