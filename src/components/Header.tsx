import {
  BagIcon,
  ChevronDown,
  LogoIcon,
  SearchIcon,
} from "./Icons";

const navItems = [
  { label: "Explore", hasDropdown: true },
  { label: "Soul Experts", hasDropdown: true },
  { label: "Programs", hasDropdown: true },
  { label: "Membership", hasDropdown: false },
  { label: "Events", hasDropdown: false },
  { label: "Blog", hasDropdown: false },
];

export default function Header() {
  return (
    <header className="relative z-50 w-full">
      <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-between px-6 lg:h-[68px] lg:px-10 xl:px-12">
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-2.5">
          <LogoIcon className="shrink-0" />
          <div className="flex flex-col leading-none">
            <span className="text-[20px] font-semibold tracking-[0.02em] text-white">
              SoulSensei
            </span>
            <span className="mt-[3px] text-[8.5px] font-medium uppercase tracking-[0.2em] text-[#C5A059]">
              Awaken. Heal. Transform.
            </span>
          </div>
        </a>

        {/* Center Nav */}
        <nav className="hidden items-center gap-6 xl:flex 2xl:gap-7">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className="nav-link flex items-center gap-1 text-[13px] font-normal tracking-[0.02em]"
            >
              {item.label}
              {item.hasDropdown && (
                <ChevronDown className="ml-0.5 opacity-60" />
              )}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <button
            type="button"
            aria-label="Search"
            className="nav-link hidden p-1.5 sm:inline-flex"
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            aria-label="Cart"
            className="nav-link hidden p-1.5 sm:inline-flex"
          >
            <BagIcon />
          </button>

          <a
            href="#login"
            className="hidden rounded-lg border border-[#D4AF37]/55 px-5 py-[7px] text-[13px] font-medium text-white transition hover:border-[#D4AF37] hover:bg-[#D4AF37]/8 sm:inline-flex"
          >
            Login
          </a>

          <a
            href="#start"
            className="btn-gold inline-flex items-center rounded-lg px-5 py-2.5 text-[13px] font-semibold tracking-wide"
          >
            Start Your Journey
          </a>
        </div>
      </div>
    </header>
  );
}
