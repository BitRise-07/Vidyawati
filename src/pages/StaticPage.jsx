import { Link, useParams } from "react-router-dom";
import { FaArrowRight, FaBookOpen, FaCheckCircle } from "react-icons/fa";

import Footer from "../components/common/Footer";

const pageCopy = {
  careers: "Build a learning career with Vidyawati and help students grow practical skills.",
  affiliates: "Partner with Vidyawati to share quality learning with more students.",
  articles: "Explore practical learning articles, study guides, and career notes.",
  blog: "Read product updates, education insights, and learner success stories.",
  docs: "Find platform guides and support resources for students and instructors.",
  projects: "Practice with guided projects that help turn lessons into portfolio work.",
  videos: "Browse video-led learning resources and course previews.",
  workspaces: "Use organized learning spaces for lessons, notes, and practice tasks.",
  forums: "Connect with learners, ask questions, and share progress.",
  chapters: "Join local and online learning groups organized around shared goals.",
  events: "Attend workshops, webinars, and community learning sessions.",
  terms: "Review Vidyawati's service terms and platform policies.",
};

const formatTitle = (slug = "") =>
  slug
    .split("-")
    .map((part) =>
      part.length <= 3 ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join(" ");

const StaticPage = () => {
  const { slug } = useParams();
  const title = formatTitle(slug);
  const description =
    pageCopy[slug] ||
    `Explore Vidyawati ${title.toLowerCase()} resources designed to support focused, career-ready learning.`;

  return (
    <div className="min-h-screen bg-orange-50">
      <main className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-xl border border-orange-100 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
            <div className="p-8 sm:p-10 lg:p-12">
              <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#F9872C]">
                <FaBookOpen />
                Vidyawati
              </span>
              <h1 className="mt-5 text-3xl font-extrabold text-vd-secondary sm:text-4xl">
                {title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-vd-txt">
                {description}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {["Expert-led courses", "Flexible learning", "Career-focused practice"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-semibold text-vd-secondary">
                    <FaCheckCircle className="shrink-0 text-[#F9872C]" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F9872C] px-5 py-3 text-sm font-bold text-white transition hover:bg-vd-secondary"
                >
                  Browse Courses
                  <FaArrowRight className="text-xs" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-vd-secondary px-5 py-3 text-sm font-bold text-vd-secondary transition hover:bg-vd-secondary hover:text-white"
                >
                  Contact Support
                </Link>
              </div>
            </div>

           
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StaticPage;
