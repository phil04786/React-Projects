import { useEffect, useState } from "react";

export default function ProgressBar({ timer }) {
  const [reaminingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("INTERVAL");
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      console.log("Cleaning Interval");
      clearInterval(interval);
    };
  }, []);

  return <progress value={reaminingTime} max={timer} />;
}
