import { Link, useParams } from "react-router-dom";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

const pageText = {
  "profile-health": {
    title: "Profile Health",
    description: "Keep your profile complete so instructors and support can understand your goals.",
  },
  issues: {
    title: "Your Issues",
    description: "Track support issues and account requests in one place.",
  },
  feedback: {
    title: "Give Feedback",
    description: "Share what is working, what feels confusing, and what Vidyawati should improve next.",
  },
  privacy: {
    title: "Privacy Policy",
    description: "Review how account data, learning activity, and communication preferences are handled.",
  },
  terms: {
    title: "Terms of Service",
    description: "Read the terms that govern learning, enrollment, payments, and platform usage.",
  },
};

const titleFromSlug = (slug = "") =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const SettingsInfoPage = () => {
  const { settingSlug } = useParams();
  const content = pageText[settingSlug] || {
    title: titleFromSlug(settingSlug),
    description: "This settings section is ready for future account controls.",
  };

  return (
    <div className="animate-fade-in-up">
      <div className="rounded-xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
        <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#F9872C]">
          Settings
        </span>
        <h1 className="mt-4 text-2xl font-extrabold text-vd-secondary sm:text-3xl">
          {content.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-vd-txt">
          {content.description}
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {["Account secure", "Profile editable", "Support available"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm font-semibold text-vd-secondary">
              <FaCheckCircle className="shrink-0 text-[#F9872C]" />
              {item}
            </div>
          ))}
        </div>

        <Link
          to="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#F9872C] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-vd-secondary"
        >
          Contact support
          <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </div>
  );
};

export default SettingsInfoPage;
