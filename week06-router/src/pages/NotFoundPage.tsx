import { Link, useLocation } from "react-router";

function NotFoundPage() {
  const { pathname } = useLocation();
  return (
    <section className="mx-auto w-full max-w-[1220px] break-words px-[14px] py-[34px] sm:px-5">
      <title>Page not found · CampusFlow</title>
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="my-5 text-sm text-[#6c7485]">There is no page at {pathname}.</p>
      <Link to="/" className="rounded text-sm font-bold text-[#6d5dfc] focus-visible:outline-2 focus-visible:outline-offset-2">Back to Dashboard</Link>
    </section>
  );
}

export default NotFoundPage;
