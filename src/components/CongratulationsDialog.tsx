"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type CongratulationsDialogProps = {
  onClose?: () => void;
};

export default function CongratulationsDialog({ onClose }: CongratulationsDialogProps) {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }
    router.push("/");
  };

  return (
    <div
      className="congrats-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="congrats-title"
    >
      <button
        type="button"
        className="congrats-close"
        onClick={handleClose}
        aria-label="Close"
      >
        <CloseIcon />
      </button>

      <div className="congrats-icon-wrap" aria-hidden>
        <span className="congrats-sparkle congrats-sparkle-tl">✦</span>
        <span className="congrats-dot congrats-dot-tl" />
        <span className="congrats-dot congrats-dot-tr" />
        <span className="congrats-sparkle congrats-sparkle-tr">✦</span>
        <span className="congrats-dot congrats-dot-bl" />
        <span className="congrats-sparkle congrats-sparkle-br">✦</span>
        <span className="congrats-dot congrats-dot-br" />
        <div className="congrats-check-circle">
          <CheckIcon />
        </div>
      </div>

      <h1 id="congrats-title" className="congrats-title">
        Congratulations!
      </h1>
      <p className="congrats-lead">We&apos;ve received your payment successfully.</p>
      <p className="congrats-sub">
        Your booking is confirmed and your spiritual journey begins now.
      </p>

      <div className="congrats-whatsapp">
        <span className="congrats-whatsapp-icon" aria-hidden>
          <WhatsAppIcon />
        </span>
        <span className="congrats-whatsapp-divider" aria-hidden />
        <div className="congrats-whatsapp-copy">
          <p className="congrats-whatsapp-title">
            We have sent the join link on your WhatsApp
          </p>
          <p className="congrats-whatsapp-desc">
            Please check WhatsApp and tap the link to join our exclusive community.
          </p>
        </div>
      </div>

      <div className="congrats-actions">
        <Link href="/live-sessions" className="congrats-btn-secondary">
          <span className="congrats-btn-icon" aria-hidden>
            <LotusIcon />
          </span>
          <span className="congrats-btn-label">Explore More Sessions</span>
          <span className="congrats-btn-arrow" aria-hidden>
            →
          </span>
        </Link>
      </div>

      <p className="congrats-secure">
        <span className="congrats-secure-icon" aria-hidden>
          <ShieldIcon />
        </span>
        Your payment is secure and your information is safe with us.
      </p>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 4L12 12M12 4L4 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5.5 12.5L10 17L18.5 7.5"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <path
        d="M17.47 14.38c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.41.12-.54.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.44-.45-.61-.46h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.18 1.93 2.95 4.68 4.13 1.64.71 2.28.77 3.1.65.5-.07 1.6-.65 1.82-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32Z"
        fill="#fff"
      />
    </svg>
  );
}

function LotusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20c2.5-3 4-6 4-9a4 4 0 10-8 0c0 3 1.5 6 4 9Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 14c-2.2-1.2-3.5-3-3.5-5.2A3.2 3.2 0 018 5.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 14c2.2-1.2 3.5-3 3.5-5.2A3.2 3.2 0 0016 5.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3L5 6.2V11.5C5 16.1 8.1 20.1 12 21.2C15.9 20.1 19 16.1 19 11.5V6.2L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 12.2L11.2 13.9L14.7 10.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
