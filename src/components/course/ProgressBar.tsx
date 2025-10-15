"use client";

import { motion } from "framer-motion";
import { Progress } from "@/interfaces";

export default function ProgressBar({
  completedLessons,
  percentage,
  totalLessons,
}: Progress) {
  return (
    <div className="relative w-full max-w-lg mx-auto p-4">
      {/* Progress Container */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#6abd8a] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* "You" Indicator */}
      <div
        className="absolute -top-10 flex flex-col items-center "
        style={{ left: `calc(${percentage}% - 15px)` }}
      >
        <div className="bg-white border border-gray-300 rounded-full px-2 py-2 text-xs font-medium text-indigo-700 shadow-sm">
          You
        </div>
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent mt-1 border-t-gray-300" />
      </div>

      {/* Percentage Text (centered under the progress) */}
      <div
        className="absolute text-center text-sm font-medium text-indigo-700 mt-2"
        style={{ left: `calc(${percentage}% - 15px)` }}
      >
        {percentage}%
      </div>
    </div>
  );
}
