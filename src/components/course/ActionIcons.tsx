"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, BookOpen, HelpCircle, Trophy } from "lucide-react";
import { Button } from "../ui/button";

const ActionIcons = () => {
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [questionDraft, setQuestionDraft] = useState("");

  // Load saved draft from session
  useEffect(() => {
    const saved = sessionStorage.getItem("questionDraft");
    if (saved) setQuestionDraft(saved);
  }, []);

  // Save draft to session
  useEffect(() => {
    sessionStorage.setItem("questionDraft", questionDraft);
  }, [questionDraft]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex gap-4 justify-center mt-4">
      {/* Curriculum */}
      <IconButton
        icon={<BookOpen className="w-5 h-5" />}
        label="Curriculum"
        onClick={() => scrollToSection("curriculum-section")}
      />

      {/* Comments */}
      <IconButton
        icon={<MessageCircle className="w-5 h-5" />}
        label="Comments"
        onClick={() => scrollToSection("comments-section")}
      />

      {/* Ask a Question */}
      <IconButton
        icon={<HelpCircle className="w-5 h-5" />}
        label="Ask a Question"
        onClick={() => setShowQuestionModal(true)}
      />

      {/* Leaderboard */}
      <IconButton
        icon={<Trophy className="w-5 h-5" />}
        label="Leaderboard"
        onClick={() => setShowLeaderboard(true)}
      />

      {/* Question Modal */}
      {showQuestionModal && (
        <Modal
          onClose={() => setShowQuestionModal(false)}
          title="Ask a Question"
        >
          <textarea
            value={questionDraft}
            onChange={(e) => setQuestionDraft(e.target.value)}
            placeholder="Type your question..."
            className="w-full min-h-[100px] p-3 border rounded-lg text-sm resize-none transition-all duration-300 
              focus:outline-none focus:ring-2 focus:ring-[#6abd8a] focus:scale-[1.01]
              bg-white text-gray-900 
              dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            rows={4}
          />
          <Button
            className="bg-[#6abd8a] mt-2 hover:bg-[#5aad7a] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => {
              alert("Question submitted!");
              setQuestionDraft("");
              sessionStorage.removeItem("questionDraft");
              setShowQuestionModal(false);
            }}
          >
            Submit
          </Button>
        </Modal>
      )}

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <Modal onClose={() => setShowLeaderboard(false)} title="Leaderboard">
          <div dir="rtl" className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">
              Course Name Shown Here
            </h3>
            <h4 className="text-indigo-800 dark:text-indigo-300 font-bold">
              Leaderboard
            </h4>
            <div
              className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg 
              text-indigo-900 dark:text-indigo-100 leading-relaxed text-sm font-medium inline-block text-right"
            >
              عظيم يا صديقي.. أدائك في الكورس ده
              <br />
              أفضل من{" "}
              <span className="font-semibold text-indigo-700 dark:text-indigo-400">
                ٦٠٪
              </span>{" "}
              من باقي الطلبة.
              <br />
              كمل عايز أشوف اسمك في الليدر بورد هنا 💪
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ActionIcons;


function IconButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 
        hover:text-indigo-600 hover:border-indigo-400 transition
        dark:border-gray-600 dark:text-gray-300 dark:hover:text-indigo-400 dark:hover:border-indigo-500"
      title={label}
    >
      {icon}
    </motion.button>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 dark:bg-black/70 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg w-full max-w-md border border-gray-100 dark:border-gray-700"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition"
          >
            ✕
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
