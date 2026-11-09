interface FooterProps {
  note: string;
}

function Footer({ note }: FooterProps) {
  return (
    <footer className="border-t border-[#e5e9f2] bg-white">
      <div className="mx-auto flex min-h-[74px] w-full max-w-[1220px] flex-col items-start justify-center gap-1 px-[14px] py-4 text-[11px] text-[#6c7485] sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-5">
        <span>CampusFlow · Web Programming</span>
        <span>{note}</span>
      </div>
    </footer>
  );
}

export default Footer;
