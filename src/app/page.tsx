"use client";
import DataCharts from "@/components/charts/DataCharts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <div className="flex flex-col items-center dark:bg-slate-950 w-full">
      <div className="sticky top-0 z-50 bg-[rgb(2,6,22)] bg-opacity-10 backdrop-filter backdrop-blur-md w-full px-[8%] py-6 sm:py-3">
        <div className="flex item-center">
          <button
            className="xs:block sm:hidden mr-6"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="mx-30 font-inter text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-8xl tracking-normal sm:tracking-wide md:tracking-wider lg:tracking-widest">
            NEUROREHAB GLOVE
          </h1>
        </div>
        {(isMenuOpen || window.innerWidth >= 640) && (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 flex-wrap py-4 justify-between">
            {Array.from({ length: 6 }, (_, i) => i + 1).map((fingerNumber) => (
              <button
                key={fingerNumber}
                onClick={() => router.push(`#${fingerNumber}`)}
                className="p-2 px-4 text-white border border-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              >
                {getFingerName(fingerNumber)}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="w-full px-[8%]">
        {Array.from({ length: 6 }, (_, i) => i + 1).map((fingerNumber) => (
          <DataCharts key={fingerNumber} fingerNumber={fingerNumber} />
        ))}
      </div>
    </div>
  );
}
