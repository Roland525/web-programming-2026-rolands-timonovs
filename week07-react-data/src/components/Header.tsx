import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
interface HeaderProps {
  userName: string;
  userInitials: string;
  course: string;
}
const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/projects", label: "Projects" },
  { to: "/deadlines", label: "Deadlines" },
];
function navClass({ isActive }: { isActive: boolean }): string {
  const base = "rounded-lg px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc]";
  return `${base} ${isActive ? "bg-slate-100 text-[#172033]" : "text-[#6c7485] hover:bg-slate-100 hover:text-[#172033]"}`;
}
function Header({ userName, userInitials, course }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKey(event: KeyboardEvent): void {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMenuOpen]);

  function closeMenu(): void {
    setIsMenuOpen(false);
  }
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1220px] items-center gap-7 px-[14px] sm:px-5">
        <Link
          to="/"
          onClick={closeMenu}
          className="inline-flex items-center gap-2.5 font-extrabold tracking-tight"
        >
          <span className="grid h-[38px] w-[38px] place-items-center rounded-xl bg-gradient-to-br from-[#6d5dfc] to-[#8a7dff] text-[13px] font-extrabold text-white shadow-lg">
            CF
          </span>
          <span>CampusFlow</span>
        </Link>
        <button
          id="menuButton"
          className="ml-auto block h-[42px] w-[42px] cursor-pointer rounded-lg p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc] md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          aria-controls="mainNav"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="my-[5px] block h-[2px] rounded-full bg-[#172033]"></span>
          <span className="my-[5px] block h-[2px] rounded-full bg-[#172033]"></span>
          <span className="my-[5px] block h-[2px] rounded-full bg-[#172033]"></span>
        </button>
        <nav
          id="mainNav"
          className={`absolute left-5 right-5 top-[72px] flex-col gap-1 rounded-xl border border-slate-200 bg-white p-2.5 shadow-xl md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none ${isMenuOpen ? "flex" : "hidden"}`}
        >
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass} onClick={closeMenu}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2.5 md:flex">
          <div className="grid h-[38px] w-[38px] place-items-center rounded-full bg-[#172033] text-xs font-extrabold text-white">
            {userInitials}
          </div>
          <div className="grid gap-px">
            <strong className="text-[13px]">{userName}</strong>
            <span className="text-[11px] text-[#6c7485]">{course}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
