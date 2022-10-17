import React, { useEffect } from "react";
import { getTimelogs } from "../data/getTimelogs";

function Timer() {
  useEffect(() => {
    getTimelogs();
  }, []);
  return <div>Timer</div>;
}

export default Timer;
