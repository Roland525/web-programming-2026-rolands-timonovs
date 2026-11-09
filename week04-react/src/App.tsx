import Header from "./components/Header";
import Hero from "./components/Hero";
import Resources from "./components/Resources";
import Footer from "./components/Footer";
import StatCard from "./components/StatCard";
import SectionHeading from "./components/SectionHeading";

function App() {
  return (
    <>
      <Header userName="Rolands Timonovs" userInitials="RT" course="Web Programming" />
      <main>
        <Hero />
        <section className="mx-auto w-full max-w-[1220px] px-[14px] py-[34px] pb-4 sm:px-5">
          <SectionHeading eyebrow="OVERVIEW" title="Your workspace">
            <p className="max-w-[420px] text-sm text-[#6c7485]">A quick snapshot of what needs attention today.</p>
          </SectionHeading>
          <div className="stats-grid grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard index="01" label="Active projects" value="3" note="calculated from data" tone="positive" />
            <StatCard index="02" label="Tasks completed" value="18" note="+6 this week" tone="positive" />
            <StatCard index="03" label="Quiz average" value="84%" note="Last 4 quizzes" />
            <StatCard index="04" label="Rīga now" value="…" note="Loading weather…" />
          </div>
        </section>
        <section className="mx-auto w-full max-w-[1220px] px-[14px] pt-[34px] sm:px-5" id="weeklyStatus">
          <div className="flex items-start gap-3 rounded-xl border border-[#bfe7d6] bg-[#eefbf6] p-4 text-sm text-[#176b4c]">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#1ca76f]"></span>
            <p><strong>On track.</strong> You completed 7 tasks and have 2 deadlines coming up this week.</p>
          </div>
        </section>
        <section className="mx-auto grid w-full max-w-[1220px] grid-cols-1 gap-[18px] px-[14px] py-[34px] pb-16 sm:px-5 lg:grid-cols-[1.45fr_.75fr]">
          <section className="rounded-[18px] border border-[#e5e9f2] border-l-4 border-l-[#6d5dfc] bg-white p-6" id="deadlines">
            <SectionHeading eyebrow="DEADLINES" title="Coming up">
              <a className="text-xs font-extrabold text-[#6d5dfc]" href="#">See all</a>
            </SectionHeading>
          </section>
          <Resources />
        </section>
      </main>
      <Footer note="React components with TypeScript" />
    </>
  );
}

export default App;
