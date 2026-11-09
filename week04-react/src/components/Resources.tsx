function Resources() {
  return (
    <aside className="rounded-[18px] border border-[#e5e9f2] bg-white p-6" id="resources">
            <p className="mb-2.5 text-[11px] font-extrabold tracking-[0.14em] text-[#6d5dfc]">RESOURCES</p><h2 className="text-[28px] font-bold tracking-[-0.035em]">Useful links</h2><p className="mb-[18px] mt-2 text-[13px] text-[#6c7485]">Keep these close while working through the project.</p>
            <div className="grid gap-2">
              <a className="flex items-center gap-3 rounded-[13px] border border-[#e5e9f2] p-3 transition hover:border-[#cacfe0] hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc]" href="#"><span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[10px] bg-[#f0edff] text-[10px] font-extrabold text-[#6d5dfc]">01</span><span className="grid gap-0.5"><strong className="text-xs">Course repository</strong><small className="text-[10px] text-[#6c7485]">Starter code and weekly tasks</small></span></a>
              <a className="flex items-center gap-3 rounded-[13px] border border-[#e5e9f2] p-3 transition hover:border-[#cacfe0] hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc]" href="#"><span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[10px] bg-[#f0edff] text-[10px] font-extrabold text-[#6d5dfc]">02</span><span className="grid gap-0.5"><strong className="text-xs">Reference notes</strong><small className="text-[10px] text-[#6c7485]">Quick examples and explanations</small></span></a>
              <a className="flex items-center gap-3 rounded-[13px] border border-[#e5e9f2] p-3 transition hover:border-[#cacfe0] hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc]" href="#"><span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[10px] bg-[#f0edff] text-[10px] font-extrabold text-[#6d5dfc]">03</span><span className="grid gap-0.5"><strong className="text-xs">Submission guide</strong><small className="text-[10px] text-[#6c7485]">Checklist before you submit</small></span></a>
            </div>
            <div className="mt-[18px] rounded-[13px] border border-[#f3e4b6] bg-[#fff8e8] p-3.5"><strong className="text-[11px] text-[#9a6c16]">Tip</strong><p className="mt-1 text-[11px] text-[#735d34]">Use browser DevTools while migrating the page. Compare computed styles before and after each change.</p></div>
          </aside>
  );
}

export default Resources;
