"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CommunityJoinExperience from "@/components/communityJoin/CommunityJoinExperience";

export default function CommunityJoinPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/just99") return;
    const timer = window.setTimeout(() => setIsOpen(true), 500);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (pathname === "/just99" || !isOpen) return null;

  function dismissPopup() {
    setIsOpen(false);
  }

  return (
    <div className="community-popup-overlay fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-3">
      <button
        type="button"
        aria-label="Close popup"
        className="absolute inset-0 bg-[#2E1650]/65 backdrop-blur-[6px]"
        onClick={dismissPopup}
      />

      <div className="relative z-10 w-full max-w-[820px]">
        <CommunityJoinExperience variant="popup" onClose={dismissPopup} />
      </div>
    </div>
  );
}
