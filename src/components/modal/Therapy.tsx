import React, { useState, useEffect } from "react";
import { ProgressCircle } from "@tremor/react";

type Props = {};

const TherapyModal = (props: Props) => {
  const CALIBRATION_TIME = 10000; // 30000 milliseconds = 30 seconds
  const COUNTDOWN_TIME = 500; // 1000 milliseconds = 1 second
  const COLLECTING_INTERVAL = 900; // 500 milliseconds = 0.5 seconds
  const RELOAD_DELAY = 10000; // 5000 milliseconds = 5 seconds

  const [calibrating, setCalibration] = useState(true);
  const [increment, setIncrement] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [progress, setProgress] = useState(0);
  const [collectingProgress, setCollectingProgress] = useState(0);
  const [isCollectingDone, setIsCollectingDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCalibration(false);
    }, CALIBRATION_TIME);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (calibrating) {
      const interval = setInterval(() => {
        setIncrement(
          (prevIncrement) => prevIncrement + 100 / (CALIBRATION_TIME / 1000)
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [calibrating]);
  useEffect(() => {
    if (!calibrating && countdown > 0) {
      setProgress(0);

      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, COUNTDOWN_TIME);

      const progressInterval = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 10);
      }, 10);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
  }, [calibrating, countdown]);

  useEffect(() => {
    if (!calibrating && countdown === 0) {
      const collectingInterval = setInterval(() => {
        setCollectingProgress((prevProgress) => {
          const newProgress = prevProgress + 2;
          if (newProgress >= 100) {
            setIsCollectingDone(true);
            clearInterval(collectingInterval);
          }
          return newProgress;
        });
      }, COLLECTING_INTERVAL);

      return () => {
        clearInterval(collectingInterval);
      };
    }
  }, [calibrating, countdown]);
  useEffect(() => {
    if (isCollectingDone) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, RELOAD_DELAY);

      return () => clearTimeout(timer);
    }
  }, [isCollectingDone]);

  return (
    <div>
      {calibrating ? (
        <div className="flex flex-col items-center gap-7 py-6">
          <div className="flex flex-col items-center gap-7">
            <p>Calibrating</p>
            <p>Stay still...</p>
          </div>
          <ProgressCircle
            value={increment}
            color="green"
            size="xl"
            id={increment.toString()}
            showAnimation
          >
            <span className="text-2xl font-medium text-slate-700">
              {Math.floor(increment)}%
            </span>
          </ProgressCircle>
        </div>
      ) : countdown > 0 ? (
        <div className="flex flex-col items-center gap-7 py-6">
          <div>Starting...</div>
          <ProgressCircle
            value={progress}
            color="red"
            size="xl"
            id={countdown.toString()}
            showAnimation
          >
            <span className="text-2xl font-medium text-slate-700">
              {countdown}
            </span>
          </ProgressCircle>
        </div>
      ) : isCollectingDone ? (
        <div className="flex flex-col items-center gap-7 py-6">
          <p>Done</p>
          <p> Saving Please wait...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-7 py-6">
          <div className="flex flex-col items-center gap-7">
            <p>Collecting data</p>
            <p>Move your Fingers</p>
          </div>
          <ProgressCircle
            value={collectingProgress}
            color="blue"
            size="xl"
            id="collecting"
            showAnimation
          >
            <span className="text-2xl font-medium text-slate-700">
              {collectingProgress}%
            </span>
          </ProgressCircle>
        </div>
      )}
    </div>
  );
};

export default TherapyModal;
