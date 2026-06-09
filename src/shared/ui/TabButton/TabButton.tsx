import * as React from "react";

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function TabButton({ isActive, onClick, children }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-1.5 rounded-lg text-sm transition-all ${
        isActive
          ? "bg-white shadow-sm text-[#4a3f35] font-semibold"
          : "opacity-50 text-[#755d48] hover:opacity-80"
      }`}
    >
      {children}
    </button>
  );
}