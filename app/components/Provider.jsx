"use client";
import { Next13ProgressBar } from "next13-progressbar";
const Provider = ({ children }) => {
  return (
    <>
      {children}
      <Next13ProgressBar
        height="6px"
        stopDelayMs={200}
        startPosition={0.3}
        showOnShallow={true}
        color="#818CF8"
        options={{ showSpinner: false }}
      />
    </>
  );
};

export default Provider;
