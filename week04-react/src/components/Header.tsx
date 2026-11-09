interface HeaderProps {
  userName: string;
  userInitials: string;
  course: string;
}

function Header({ userName, userInitials, course }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1220px] items-center gap-7 px-[14px] sm:px-5">
    
        <a href="#" className="inline-flex items-center gap-2.5 font-extrabold tracking-tight">
          <span className="grid h-[38px] w-[38px] place-items-center rounded-xl bg-gradient-to-br from-[#6d5dfc] to-[#8a7dff] text-[13px] font-extrabold text-white shadow-lg">
            CF
          </span>
          <span>CampusFlow</span>
        </a>
    
        <button
          id="menuButton"
          className="ml-auto block h-[42px] w-[42px] cursor-pointer rounded-lg p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc] md:hidden"
          aria-label="Toggle navigation"
          aria-expanded="false"
        >
          <span className="my-[5px] block h-[2px] rounded-full bg-[#172033]"></span>
          <span className="my-[5px] block h-[2px] rounded-full bg-[#172033]"></span>
          <span className="my-[5px] block h-[2px] rounded-full bg-[#172033]"></span>
        </button>
    
        <nav
          id="mainNav"
          className="absolute left-5 right-5 top-[72px] hidden flex-col gap-1 rounded-xl border border-slate-200 bg-white p-2.5 shadow-xl md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none"
        >
          <a href="#" className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-[#172033] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc]">
            Dashboard
          </a>
    
          <a href="#projects" className="rounded-lg px-3 py-2 text-sm font-semibold text-[#6c7485] hover:bg-slate-100 hover:text-[#172033] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc]">
            Projects
          </a>
    
          <a href="#deadlines" className="rounded-lg px-3 py-2 text-sm font-semibold text-[#6c7485] hover:bg-slate-100 hover:text-[#172033] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc]">
            Deadlines
          </a>
    
          <a href="#resources" className="rounded-lg px-3 py-2 text-sm font-semibold text-[#6c7485] hover:bg-slate-100 hover:text-[#172033] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc]">
            Resources
          </a>
        </nav>
    
        <div className="ml-auto hidden items-center gap-2.5 md:flex">
          <div className="grid h-[38px] w-[38px] place-items-center rounded-full bg-[#172033] text-xs font-extrabold text-white">{userInitials}</div>
    
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
