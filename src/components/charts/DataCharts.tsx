import React, { useEffect, useState } from "react";
import { ProgressCircle, LineChart } from "@tremor/react";
import { getData } from "@/api/DataChartAPI";

type Props = {
  fingerNumber: number;
};

const DataCharts = ({ fingerNumber }: Props) => {
  const [chartData, setChartData] = useState([]);
  const [increment, setIncrement] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(fingerNumber);
      console.log(res);

      const mappedData = res.data.map((item: any) => {
        const newItem: { readingNumber: any; [key: string]: any } = {
          readingNumber: item.readingNumber,
        };
        for (const key in item) {
          if (key !== "readingNumber") {
            newItem[key] = Number(item[key]);
          }
        }
        return newItem;
      });

      setChartData(mappedData);
      setIncrement(res.improvementPercentage);
    };

    fetchData();
  }, [fingerNumber]);

  const getFingerName = (fingerNumber: number) => {
    switch (fingerNumber) {
      case 1:
        return "Thumb";
      case 2:
        return "Index finger";
      case 3:
        return "Middle finger";
      case 4:
        return "Ring finger";
      case 5:
        return "Pinky finger";
      case 6:
        return "Wrist";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="py-10">
        <p className="text-xl">{getFingerName(fingerNumber)}</p>
        <LineChart
          className="h-[30rem] py-10"
          data={chartData}
          index="readingNumber"
          onValueChange={(v) => console.log(v)}
          categories={
            chartData.length > 0
              ? Object.keys(chartData[0]).filter(
                  (key) => key !== "readingNumber"
                )
              : []
          }
          yAxisWidth={60}
          showAnimation
          showLegend
          title={getFingerName(fingerNumber)}
          showTooltip
        />
      </div>
      <div>
        <div className="space-y-10">
          <div className="flex flex-row items-center justify-center gap-20">
            <p>Improved {increment.toFixed(2)}% over last try</p>
            <ProgressCircle
              value={increment}
              size="xl"
              id={(fingerNumber + 1).toString()}
              showAnimation
            >
              <span className="text-2xl font-medium text-slate-700">
                {increment.toFixed(2)}%
              </span>
            </ProgressCircle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCharts;
