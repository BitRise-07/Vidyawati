import React from "react";
import CTAButton from "../HomePage/Button";
import Highlightedtext from "../HomePage/Highlightedtext";
import Know_your_progress from "../../../assets/images/Know_your_progress.png";
import Compare_with_others from "../../../assets/images/Compare_with_others.png";
import Plan_your_lessons from "../../../assets/images/Plan_your_lessons.png";

const LearningLangSection = () => {
  return (
    <div className="px-6 mx-auto py-15 text-center">
      <h2 className="text-4xl lg:text-4xl font-bold text-vd-secondary mb-4">
        Your swiss knife for{" "}
        <Highlightedtext>learning any language</Highlightedtext>
      </h2>

      <p className="text-vd-txt text-lg max-w-2xl mx-auto mb-16">
        Using spin making learning multiple languages easy. With 20+ languages,
        realistic voice-over, progress tracking, custom schedule and more.
      </p>

      <div className="flex flex-col lg:flex-row justify-center items-center mt-5">
        <img
          src={Know_your_progress}
          alt="Know your progress"
          className="object-contain -mr-32"
        />
        <img
          src={Compare_with_others}
          alt="Compare with others"
          className="object-contain "
        />
        <img
          src={Plan_your_lessons}
          alt="Plan your lessons"
          className="object-contain -ml-36 "
        />
      </div>

      <div className="mt-12">
        <CTAButton
          variant="primary"
          linkTo="/signup"
          className="px-8 py-4 text-md font-semibold"
        >
          Learn More
        </CTAButton>
      </div>
    </div>
  );
};

export default LearningLangSection;
