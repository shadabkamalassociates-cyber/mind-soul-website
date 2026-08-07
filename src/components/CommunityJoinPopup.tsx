"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CommunityJoinExperience from "@/components/communityJoin/CommunityJoinExperience";

const POPUP_SEEN_KEY = "mind_soul_community_popup_seen";
const HIDDEN_PATHS = ["/just99", "/congratulations"];

function hasSeenPopup() {
  try {
    return window.localStorage.getItem(POPUP_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markPopupSeen() {
  try {
    window.localStorage.setItem(POPUP_SEEN_KEY, "1");
  } catch {
    /* ignore quota / private mode */
  }
}

export default function CommunityJoinPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (HIDDEN_PATHS.includes(pathname)) return;
    if (hasSeenPopup()) return;

    const timer = window.setTimeout(() => {
      if (hasSeenPopup()) return;
      setIsOpen(true);
      markPopupSeen();
    }, 500);

    return () => window.clearTimeout(timer);
    // Only on first mount — not on every route change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (HIDDEN_PATHS.includes(pathname) || !isOpen) return null;

  function dismissPopup() {
    markPopupSeen();
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
