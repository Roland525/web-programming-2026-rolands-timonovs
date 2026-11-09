import { Link } from "react-router";
function Hero() {
  return (
    <section className="bg-[radial-gradient(circle_at_15%_10%,rgba(109,93,252,0.14),transparent_34%),radial-gradient(circle_at_85%_0%,rgba(55,136,255,0.10),transparent_28%)] py-12 md:py-16">
      <div className="mx-auto grid w-full max-w-[1220px] grid-cols-1 items-center gap-7 px-[14px] sm:px-5 md:grid-cols-[1.4fr_.8fr] md:gap-14">
        <div>
          <span className="mb-2.5 block text-[11px] font-extrabold tracking-[0.14em] text-[#6d5dfc]">
            MONDAY WORKSPACE
          </span>
          <h1 className="m-0 max-w-[760px] text-[43px] leading-[0.98] tracking-[-0.055em] text-[#172033] md:text-[64px] lg:text-[72px]">
            Build, learn, and ship something useful.
          </h1>
          <p className="mt-6 max-w-[650px] text-base text-[#6c7485] md:text-lg">
            Track your current web-development tasks, upcoming deadlines, and
            project progress in one place.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/projects"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#6d5dfc] px-[18px] text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#5547df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc]"
            >
              View projects
            </Link>
            <a
              href="#resources"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#e5e9f2] bg-white px-[18px] text-sm font-bold transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc]"
            >
              Open resources
            </a>
          </div>
        </div>
        <aside className="rounded-[22px] border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur">
          <p className="mb-[18px] text-[13px] font-bold text-[#6c7485]">
            This week
          </p>
          <div className="mb-2 flex items-center justify-between gap-4 text-[13px]">
            <span className="text-[#6c7485]">Course progress</span>
            <strong>68%</strong>
          </div>
          <div className="h-[9px] overflow-hidden rounded-full bg-[#eceef4]">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#6d5dfc] to-[#8e80ff]"></div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-[14px] bg-slate-50 px-2.5 py-4 text-center">
              <strong className="block text-[21px]">4</strong>
              <span className="mt-1 block text-[10px] text-[#6c7485]">
                Open tasks
              </span>
            </div>
            <div className="rounded-[14px] bg-slate-50 px-2.5 py-4 text-center">
              <strong className="block text-[21px]">2</strong>
              <span className="mt-1 block text-[10px] text-[#6c7485]">
                Due soon
              </span>
            </div>
            <div className="rounded-[14px] bg-slate-50 px-2.5 py-4 text-center">
              <strong className="block text-[21px]">7</strong>
              <span className="mt-1 block text-[10px] text-[#6c7485]">
                Completed
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
export default Hero;
