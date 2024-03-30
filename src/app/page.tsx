"use client";
import DataCharts from "@/components/charts/DataCharts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Dialog, DialogPanel } from "@tremor/react";
import TherapyModal from "@/components/modal/Therapy";

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="flex flex-col dark:bg-slate-950 w-full">
      <div className="sticky top-0 z-50 bg-[rgb(2,6,22)] bg-opacity-10 backdrop-filter backdrop-blur-md w-full px-[8%] py-6 sm:py-3">
        <div className="flex item-center">
          <button
            className="xs:block sm:hidden mr-6"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-center w-full mx-30 font-inter text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-8xl tracking-normal sm:tracking-wide md:tracking-wider lg:tracking-widest">
            NEUROREHAB GLOVE
          </h1>
        </div>
        {(isMenuOpen || window.innerWidth >= 640) && (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 flex-wrap py-4 justify-between">
            <button
              className="bg-green-500 p-2 px-4 text-white border border-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
              onClick={() => {
                setIsMenuOpen(false);
                setIsOpen(true);
              }}
            >
              Start Therapy
            </button>
            {Array.from({ length: 6 }, (_, i) => i + 1).map((fingerNumber) => (
              <button
                key={fingerNumber}
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push(`#${fingerNumber}`);
                }}
                className="p-2 px-4 text-white border border-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              >
                {getFingerName(fingerNumber)}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="px-[8%] py-5">
        <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
          <DialogPanel>
            <TherapyModal />
          </DialogPanel>
        </Dialog>
      </div>
      <div className="w-full px-[8%]">
        {Array.from({ length: 6 }, (_, i) => i + 1).map((fingerNumber) => (
          <DataCharts key={fingerNumber} fingerNumber={fingerNumber} />
        ))}
      </div>
    </div>
  );
}
