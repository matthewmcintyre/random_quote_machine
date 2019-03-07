import React from "react";
import QuoteBox from "./QuoteBox";
import Header from "./Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

library.add(fab, faTwitter);

const Main = () => {
  return (
    <div id="main">
      <Header />
      <QuoteBox />
    </div>
  );
};

export default Main;
