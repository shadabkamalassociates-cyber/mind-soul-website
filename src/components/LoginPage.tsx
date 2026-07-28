"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearAuthError,
  loginUser,
  signupUser,
} from "@/store/slices/authSlice";
import { sendOtp as sendOtpRequest } from "@/services/authService";
import { ApiError } from "@/services/apiClient";

type Tab = "login" | "signup";

const features = [
  {
    title: "Verified Astrologers",
    desc: "Expert & experienced astrologers",
    icon: <ShieldFeatureIcon />,
  },
  {
    title: "100% Secure",
    desc: "Your information is safe with us",
    icon: <LockFeatureIcon />,
  },
  {
    title: "Instant Booking",
    desc: "Book your session in just a few clicks",
    icon: <ClockFeatureIcon />,
  },
  {
    title: "24/7 Support",
    desc: "We are here to help you anytime",
    icon: <HeadsetFeatureIcon />,
  },
];

const inputClass =
  "h-9 w-full rounded-lg border border-[#D8DAE8] bg-white text-[13px] text-[#1A1A4A] outline-none placeholder:text-[#A0A0B8] focus:border-[#3D3D8F]";

function generatePassword(length = 12) {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
  let result = "";
  const values = new Uint32Array(length);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(values);
    for (let i = 0; i < length; i++) {
      result += chars[values[i]! % chars.length];
    }
    return result;
  }
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]!;
  }
  return result;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((s) => s.auth.status);
  const authError = useAppSelector((s) => s.auth.error);
  const [tab, setTab] = useState<Tab>("login");

  // Shared auth fields
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [otpSending, setOtpSending] = useState(false);

  // Login-only
  const [remember, setRemember] = useState(false);
  const [passwordHint, setPasswordHint] = useState("");

  // Signup-only
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [signupError, setSignupError] = useState("");

  const passwordRules = useMemo(
    () => [
      { label: "At least 8 characters", ok: password.length >= 8 },
      { label: "One uppercase letter (A-Z)", ok: /[A-Z]/.test(password) },
      { label: "One lowercase letter (a-z)", ok: /[a-z]/.test(password) },
      { label: "One number (0-9)", ok: /[0-9]/.test(password) },
    ],
    [password],
  );

  const isSubmitting = authStatus === "loading";

  function getReturnUrl() {
    const returnUrl = searchParams.get("returnUrl");
    if (returnUrl && returnUrl.startsWith("/")) return returnUrl;
    return "/";
  }

  function resetOtpState() {
    setOtpSent(false);
    setOtpVerified(false);
    setOtp("");
    setOtpMessage("");
    setOtpSending(false);
  }

  function switchTab(next: Tab) {
    setTab(next);
    resetOtpState();
    setSignupError("");
    setPasswordHint("");
    dispatch(clearAuthError());
  }

  async function onSendOtp() {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setOtpMessage("Enter a valid 10-digit phone number.");
      setOtpSent(false);
      setOtpVerified(false);
      return;
    }

    setOtpSending(true);
    setOtpMessage("");

    try {
      const result = await sendOtpRequest(digits);
      setOtpSent(true);
      setOtpVerified(false);
      setOtp("");
      setOtpMessage(result.message);
    } catch (err) {
      setOtpSent(false);
      setOtpVerified(false);
      setOtpMessage(
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Failed to send OTP. Please try again.",
      );
    } finally {
      setOtpSending(false);
    }
  }

  function onVerifyOtp() {
    if (!otpSent) {
      setOtpMessage("Send OTP first.");
      return;
    }
    if (otp.trim().length < 6) {
      setOtpMessage("Enter the 6-digit OTP you received.");
      setOtpVerified(false);
      return;
    }
    setOtpVerified(true);
    setOtpMessage("Phone number verified successfully.");
  }

  function onGeneratePassword() {
    const next = generatePassword();
    setPassword(next);
    setShowPassword(true);
    setPasswordHint("Password generated. You can edit or copy it.");
  }

  async function onLoginSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(clearAuthError());

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setOtpMessage("Enter a valid 10-digit phone number.");
      return;
    }
    if (!password.trim()) {
      return;
    }

    const result = await dispatch(
      loginUser({ phone: digits, password }),
    );
    if (loginUser.fulfilled.match(result)) {
      router.push(getReturnUrl());
    }
  }

  async function onSignupSubmit(e: FormEvent) {
    e.preventDefault();
    setSignupError("");
    dispatch(clearAuthError());

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setOtpMessage("Enter a valid 10-digit phone number.");
      return;
    }
    if (!passwordRules.every((r) => r.ok)) {
      setSignupError("Password does not meet all requirements.");
      return;
    }
    if (password !== confirmPassword) {
      setSignupError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setSignupError("Please agree to the Terms & Privacy Policy.");
      return;
    }
    if (!fullName.trim()) {
      setSignupError("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      setSignupError("Please enter your email address.");
      return;
    }

    const parts = fullName.trim().split(/\s+/);
    const first_name = parts[0] || fullName.trim();
    const last_name = parts.slice(1).join(" ") || first_name;

    const result = await dispatch(
      signupUser({
        first_name,
        last_name,
        email: email.trim(),
        phone: digits,
        password,
      }),
    );
    if (signupUser.fulfilled.match(result)) {
      router.push(getReturnUrl());
    }
  }

  return (
    <main className="min-h-screen bg-[#E8E9F0] text-[#1A1A4A]">
      <Header />
      <div className="mx-auto max-w-[1200px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
        <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_16px_48px_rgba(26,26,74,0.1)] lg:grid lg:grid-cols-[minmax(300px,0.95fr)_minmax(0,1.15fr)] lg:items-stretch">
          {/* Left cosmic panel */}
          <div className="relative h-[180px] overflow-hidden sm:h-[220px] lg:h-auto lg:min-h-full">
            <Image
              src="/login/cosmic-panel.png"
              alt=""
              fill
              priority
              className="object-cover object-[center_38%] lg:object-[center_42%]"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>

          {/* Right form panel */}
          <div className="flex flex-col px-5 py-4 sm:px-7 sm:py-5 lg:px-8 lg:py-5">
            <div className="flex gap-7 border-b border-[#E6E8F2]">
              <button
                type="button"
                onClick={() => switchTab("login")}
                className={`pb-2 text-[14px] font-semibold transition ${
                  tab === "login"
                    ? "border-b-2 border-[#1A1A4A] text-[#1A1A4A]"
                    : "text-[#8A8AA8] hover:text-[#1A1A4A]"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => switchTab("signup")}
                className={`pb-2 text-[14px] font-semibold transition ${
                  tab === "signup"
                    ? "border-b-2 border-[#1A1A4A] text-[#1A1A4A]"
                    : "text-[#8A8AA8] hover:text-[#1A1A4A]"
                }`}
              >
                Sign Up
              </button>
            </div>

            {tab === "login" ? (
              <>
                <p className="mt-3 text-[13px] text-[#6B6B88]">
                  Welcome back! Please enter your details.
                </p>

                <form
                  onSubmit={onLoginSubmit}
                  className="mt-3 flex flex-col gap-2"
                >
                  <PhoneOtpFields
                    phone={phone}
                    otp={otp}
                    otpSent={otpSent}
                    otpVerified={otpVerified}
                    otpMessage={otpMessage}
                    otpSending={otpSending}
                    onPhoneChange={(value) => {
                      setPhone(value);
                      resetOtpState();
                    }}
                    onOtpChange={(value) => {
                      setOtp(value);
                      setOtpVerified(false);
                    }}
                    onSendOtp={onSendOtp}
                    onVerifyOtp={onVerifyOtp}
                  />

                  <Field label="Password">
                    <div className="relative flex gap-2">
                      <div className="relative min-w-0 flex-1">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8AA8]">
                          <LockIcon />
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordHint("");
                          }}
                          placeholder="Enter your password"
                          className={`${inputClass} pl-10 pr-10`}
                          required
                        />
                        <button
                          type="button"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A8AA8] transition hover:text-[#1A1A4A]"
                        >
                          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={onGeneratePassword}
                        className="h-9 shrink-0 rounded-lg border border-[#C9A06A] bg-[#FBF6EE] px-3 text-[12px] font-semibold text-[#8B6914] transition hover:bg-[#F5EBD8]"
                      >
                        Generate
                      </button>
                    </div>
                    {passwordHint ? (
                      <p className="mt-1 text-[11px] text-[#6B6B88]">
                        {passwordHint}
                      </p>
                    ) : null}
                  </Field>

                  <div className="flex items-center justify-between gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 text-[12px] text-[#5C5C7A]">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="h-3.5 w-3.5 rounded border-[#C8CAD8] accent-[#1A1A4A]"
                      />
                      Remember me
                    </label>
                    <Link
                      href="/login#forgot"
                      className="text-[12px] font-medium text-[#3D3D8F] hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {authError && tab === "login" ? (
                    <p className="text-[11px] text-[#B42318]">{authError}</p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#1A1A4A] text-[14px] font-semibold text-white transition hover:bg-[#2A2A6A] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                    {!isSubmitting ? <ArrowRightIcon /> : null}
                  </button>
                </form>

                {/* <div className="my-3 flex items-center gap-3">
                  <span className="h-px flex-1 bg-[#E6E8F2]" />
                  <span className="text-[11px] text-[#8A8AA8]">
                    or continue with
                  </span>
                  <span className="h-px flex-1 bg-[#E6E8F2]" />
                </div> */}

                {/* <div className="grid grid-cols-3 gap-2">
                  <SocialButton label="Google" icon={<GoogleIcon />} />
                  <SocialButton label="Facebook" icon={<FacebookIcon />} />
                  <SocialButton label="Apple" icon={<AppleIcon />} />
                </div> */}

                <div className="mt-3 rounded-lg border border-[#E6E8F2] bg-[#F8F9FC] px-3.5 py-2.5">
                  <p className="text-[13px] font-semibold text-[#1A1A4A]">
                    New to astrology?
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-[#6B6B88]">
                    Create an account to book sessions, track orders and more.
                  </p>
                  <button
                    type="button"
                    onClick={() => switchTab("signup")}
                    className="mt-2 inline-flex h-8 items-center gap-2 rounded-lg border border-[#D0D2E0] bg-white px-3 text-[12px] font-semibold text-[#1A1A4A] transition hover:border-[#3D3D8F] hover:text-[#3D3D8F]"
                  >
                    <UserPlusIcon />
                    Create Account
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mt-3">
                  <h3
                    className="text-[17px] font-semibold leading-tight text-[#1A1A4A] sm:text-[19px]"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    Create Your Account
                  </h3>
                  <p className="mt-0.5 text-[12px] text-[#6B6B88]">
                    Join us and start your journey to the stars.
                  </p>
                </div>

                <form
                  onSubmit={onSignupSubmit}
                  className="mt-3 flex flex-col gap-2"
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Field label="Full Name">
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8AA8]">
                          <UserFieldIcon />
                        </span>
                        <input
                          type="text"
                          autoComplete="name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          className={`${inputClass} pl-10 pr-3`}
                          required
                        />
                      </div>
                    </Field>

                    <Field label="Email Address">
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8AA8]">
                          <MailIcon />
                        </span>
                        <input
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className={`${inputClass} pl-10 pr-3`}
                          required
                        />
                      </div>
                    </Field>
                  </div>

                  <Field label="Phone Number">
                    <div className="flex gap-1.5">
                      <div className="inline-flex h-9 shrink-0 items-center gap-1 rounded-lg border border-[#D8DAE8] bg-[#F8F9FC] px-2 text-[12px] font-medium text-[#1A1A4A]">
                        <IndiaFlag />
                        +91
                      </div>
                      <div className="relative min-w-0 flex-1">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8AA8]">
                          <PhoneIcon />
                        </span>
                        <input
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            resetOtpState();
                          }}
                          placeholder="Enter phone number"
                          className={`${inputClass} pl-10 pr-3`}
                          required
                        />
                      </div>
                      <button
                        type="button"
                        onClick={onSendOtp}
                        disabled={otpSending}
                        className="h-9 shrink-0 rounded-lg bg-[#1A1A4A] px-2.5 text-[11px] font-semibold whitespace-nowrap text-white transition hover:bg-[#2A2A6A] disabled:cursor-not-allowed disabled:opacity-60 sm:px-3 sm:text-[12px]"
                      >
                        {otpSending
                          ? "Sending..."
                          : otpSent
                            ? "Resend"
                            : "Send OTP"}
                      </button>
                    </div>
                  </Field>

                  <Field label="OTP">
                    <div className="relative flex gap-1.5">
                      <div className="relative min-w-0 flex-1">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8AA8]">
                          <OtpIcon />
                        </span>
                        <input
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          value={otp}
                          onChange={(e) => {
                            setOtp(
                              e.target.value.replace(/\D/g, "").slice(0, 6),
                            );
                            setOtpVerified(false);
                          }}
                          placeholder="Enter OTP to verify phone"
                          className={`${inputClass} pl-10 pr-3`}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={onVerifyOtp}
                        className={`h-9 shrink-0 rounded-lg px-3 text-[12px] font-semibold transition ${
                          otpVerified
                            ? "bg-[#1B7A4A] text-white"
                            : "bg-[#C9A06A] text-[#1A1208] hover:brightness-105"
                        }`}
                      >
                        {otpVerified ? "Verified" : "Verify"}
                      </button>
                    </div>
                    {otpMessage ? (
                      <p
                        className={`mt-1 text-[11px] ${getOtpMessageClass(
                          otpVerified,
                          otpSent,
                        )}`}
                      >
                        {otpMessage}
                      </p>
                    ) : null}
                  </Field>

                  <div className="grid gap-2 sm:grid-cols-2">
                    <Field label="Password">
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8AA8]">
                          <LockIcon />
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setSignupError("");
                          }}
                          placeholder="Create a password"
                          className={`${inputClass} pl-10 pr-10`}
                          required
                        />
                        <button
                          type="button"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A8AA8] transition hover:text-[#1A1A4A]"
                        >
                          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      </div>
                    </Field>

                    <Field label="Confirm Password">
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8AA8]">
                          <LockIcon />
                        </span>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setSignupError("");
                          }}
                          placeholder="Confirm password"
                          className={`${inputClass} pl-10 pr-10`}
                          required
                        />
                        <button
                          type="button"
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirm password"
                              : "Show confirm password"
                          }
                          onClick={() => setShowConfirmPassword((v) => !v)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A8AA8] transition hover:text-[#1A1A4A]"
                        >
                          {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      </div>
                    </Field>
                  </div>

                  <div className="rounded-lg border border-[#E6E8F2] bg-[#F8F9FC] px-2.5 py-1.5">
                    <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                      {passwordRules.map((rule) => (
                        <li
                          key={rule.label}
                          className={`flex items-center gap-1.5 text-[10px] sm:text-[11px] ${
                            rule.ok ? "text-[#1B7A4A]" : "text-[#8A8AA8]"
                          }`}
                        >
                          <RuleCheck ok={rule.ok} />
                          {rule.label}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <label className="inline-flex cursor-pointer items-start gap-2 text-[12px] leading-snug text-[#5C5C7A]">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => {
                        setAgreed(e.target.checked);
                        setSignupError("");
                      }}
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-[#C8CAD8] accent-[#1A1A4A]"
                    />
                    <span>
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="font-medium text-[#3D3D8F] hover:underline"
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="font-medium text-[#3D3D8F] hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>

                  {signupError || (authError && tab === "signup") ? (
                    <p className="text-[11px] text-[#B42318]">
                      {signupError || authError}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#1A1A4A] text-[14px] font-semibold text-white transition hover:bg-[#2A2A6A] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Creating account..." : "Create Account"}
                    {!isSubmitting ? <ArrowRightIcon /> : null}
                  </button>
                </form>

                <div className="my-3 flex items-center gap-3">
                  <span className="h-px flex-1 bg-[#E6E8F2]" />
                  <span className="text-[11px] text-[#8A8AA8]">
                    or sign up with
                  </span>
                  <span className="h-px flex-1 bg-[#E6E8F2]" />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <SocialButton label="Google" icon={<GoogleIcon />} />
                  <SocialButton label="Facebook" icon={<FacebookIcon />} />
                  <SocialButton label="Apple" icon={<AppleIcon />} />
                </div>

                <p className="mt-3 text-center text-[12px] text-[#6B6B88]">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchTab("login")}
                    className="font-semibold text-[#3D3D8F] hover:underline"
                  >
                    Login
                  </button>
                </p>
              </>
            )}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-3 lg:mt-6">
          {features.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-1.5 scale-90 text-[#1A1A4A]">{item.icon}</div>
              <p className="text-[12px] font-semibold text-[#1A1A4A] sm:text-[13px]">
                {item.title}
              </p>
              <p className="mt-0.5 text-[10px] text-[#8A8AA8] sm:text-[11px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 shadow-[0_8px_28px_rgba(26,26,74,0.06)] sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A1A4A] text-white">
              <HeadsetFeatureIcon />
            </span>
            <p className="text-[12px] text-[#5C5C7A] sm:text-[13px]">
              Need Help? Call or WhatsApp us at{" "}
              <a
                href="tel:+919876543210"
                className="font-semibold text-[#1A1A4A] hover:underline"
              >
                +91 98765 43210
              </a>
            </p>
          </div>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp support"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition hover:brightness-105"
          >
            <WhatsAppIcon />
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function PhoneOtpFields({
  phone,
  otp,
  otpSent,
  otpVerified,
  otpMessage,
  otpSending,
  onPhoneChange,
  onOtpChange,
  onSendOtp,
  onVerifyOtp,
}: {
  phone: string;
  otp: string;
  otpSent: boolean;
  otpVerified: boolean;
  otpMessage: string;
  otpSending: boolean;
  onPhoneChange: (value: string) => void;
  onOtpChange: (value: string) => void;
  onSendOtp: () => void;
  onVerifyOtp: () => void;
}) {
  return (
    <>
      <Field label="Phone Number">
        <div className="relative flex gap-1.5">
          <div className="relative min-w-0 flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8AA8]">
              <PhoneIcon />
            </span>
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              placeholder="Enter your phone number"
              className={`${inputClass} pl-10 pr-3`}
              required
            />
          </div>
          <button
            type="button"
            onClick={onSendOtp}
            disabled={otpSending}
            className="h-9 shrink-0 rounded-lg bg-[#1A1A4A] px-3 text-[12px] font-semibold text-white transition hover:bg-[#2A2A6A] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {otpSending ? "Sending..." : otpSent ? "Resend" : "Send OTP"}
          </button>
        </div>
      </Field>

      <Field label="OTP">
        <div className="relative flex gap-1.5">
          <div className="relative min-w-0 flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8AA8]">
              <OtpIcon />
            </span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={(e) =>
                onOtpChange(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="Enter OTP"
              className={`${inputClass} pl-10 pr-3`}
            />
          </div>
          <button
            type="button"
            onClick={onVerifyOtp}
            className={`h-9 shrink-0 rounded-lg px-3 text-[12px] font-semibold transition ${
              otpVerified
                ? "bg-[#1B7A4A] text-white"
                : "bg-[#C9A06A] text-[#1A1208] hover:brightness-105"
            }`}
          >
            {otpVerified ? "Verified" : "Verify"}
          </button>
        </div>
        {otpMessage ? (
          <p
            className={`mt-1 text-[11px] ${getOtpMessageClass(
              otpVerified,
              otpSent,
            )}`}
          >
            {otpMessage}
          </p>
        ) : null}
      </Field>
    </>
  );
}

function getOtpMessageClass(otpVerified: boolean, otpSent: boolean) {
  if (otpVerified) return "text-[#1B7A4A]";
  if (otpSent) return "text-[#6B6B88]";
  return "text-[#B42318]";
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium text-[#1A1A4A]">
        {label}
      </span>
      {children}
    </label>
  );
}

function SocialButton({
  label,
  icon,
}: {
  label: string;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-[#D8DAE8] bg-white text-[11px] font-medium text-[#1A1A4A] transition hover:border-[#3D3D8F] hover:bg-[#F8F9FC] sm:text-[12px]"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function RuleCheck({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-flex h-4 w-4 items-center justify-center rounded-full ${
        ok ? "bg-[#1B7A4A] text-white" : "bg-[#D8DAE8] text-white"
      }`}
    >
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M3 6.2L5.1 8.3 9 3.8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function IndiaFlag() {
  return (
    <span
      className="inline-block h-3.5 w-5 overflow-hidden rounded-[2px] border border-black/10"
      aria-hidden
    >
      <span className="block h-[4px] bg-[#FF9933]" />
      <span className="block h-[4px] bg-white" />
      <span className="block h-[4px] bg-[#138808]" />
    </span>
  );
}

function UserFieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5 18.5c1-3 3.4-4.5 7-4.5s6 1.5 7 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.5 4.5h2.2l1.1 3.3-1.4 1a11.5 11.5 0 0 0 4.8 4.8l1-1.4 3.3 1.1v2.2c0 .8-.6 1.5-1.4 1.6-7.2.9-13.1-5-12.2-12.2.1-.8.8-1.4 1.6-1.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OtpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="4"
        y="6"
        width="16"
        height="12"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8 12h.01M12 12h.01M16 12h.01"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="5.5"
        y="10"
        width="13"
        height="9.5"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 3l18 18M10.5 10.6a2.5 2.5 0 0 0 3 3M6.2 6.5C4.1 8 2.5 12 2.5 12s3.5 6.5 9.5 6.5c1.7 0 3.2-.5 4.5-1.2M17.8 15.5C19.9 14 21.5 12 21.5 12s-3.5-6.5-9.5-6.5c-.9 0-1.7.1-2.5.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserPlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="10" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.5 18.5c.8-2.6 2.9-4 5.5-4s4.7 1.4 5.5 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M18 8v5M15.5 10.5H20.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldFeatureIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.5l7 2.5v5.2c0 4.2-2.8 7.8-7 9.3-4.2-1.5-7-5.1-7-9.3V6L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 12l1.8 1.8L15 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockFeatureIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="5.5"
        y="10"
        width="13"
        height="9.5"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockFeatureIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 8v4.5l3 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeadsetFeatureIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.5 13V11a7.5 7.5 0 0 1 15 0v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="3.5"
        y="12"
        width="3.5"
        height="5.5"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="17"
        y="12"
        width="3.5"
        height="5.5"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M17 17.5v1a2.5 2.5 0 0 1-2.5 2.5H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.82c0 1.96.52 3.88 1.52 5.57L2 22l4.78-1.55a10.1 10.1 0 0 0 5.26 1.47h.01c5.46 0 9.89-4.4 9.89-9.82C21.94 6.4 17.5 2 12.04 2Zm5.75 13.95c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.83-.11-.42-.13-.97-.32-1.67-.62-2.94-1.27-4.85-4.2-5-4.4-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.41.26-.29.57-.36.76-.36h.55c.17 0 .4-.06.63.48.24.56.8 1.94.87 2.08.07.14.12.3.02.49-.1.2-.14.32-.28.49-.14.17-.3.38-.42.51-.14.14-.28.29-.12.56.16.28.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.28.14.44.12.6-.07.17-.2.7-.81.89-1.09.19-.28.38-.23.63-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.32.07.12.07.67-.17 1.34Z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2" aria-hidden>
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.54-4.7 1.32 0 2.7.24 2.7.24v2.98h-1.52c-1.5 0-1.96.93-1.96 1.89v2.26h3.34l-.53 3.49h-2.81V24C19.61 23.09 24 18.1 24 12.07Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="15" height="18" viewBox="0 0 14 18" fill="#111" aria-hidden>
      <path d="M11.5 9.4c0-2 1.6-3 1.7-3.1-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.7-3.1.7-.7 0-1.7-.7-2.8-.7C2.5 4.7.9 5.8.2 7.6c-1.4 2.5-.4 6.1 1 8.1.7 1 1.5 2.1 2.6 2 1 0 1.4-.7 2.7-.7 1.2 0 1.6.7 2.7.7 1.1 0 1.9-1 2.6-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.1-.8-2.1-3.1ZM9.4 3.2c.6-.7 1-1.7.9-2.7-1 .1-2.1.7-2.7 1.4-.6.7-1 1.6-.9 2.6 1 .1 2-.6 2.7-1.3Z" />
    </svg>
  );
}
