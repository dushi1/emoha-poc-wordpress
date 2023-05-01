import React from "react";
import Fade from "../components/fade";

export default function Home({}) {
  return (
    <div>
      <div className="diva"></div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Fade />
        <Fade />
        <Fade />
      </div>
      <div className="diva"></div>
      <div className="diva"></div>
      <div className="diva"></div>
      <div className="diva"></div>
    </div>
  );
}
