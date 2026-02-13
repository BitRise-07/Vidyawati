import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "./Button";
import Highlightedtext from "./Highlightedtext";
import { TypeAnimation } from 'react-type-animation';

const CodeBlock = ({
    position = "lg:flex-row", 
    heading, 
    subheading, 
    ctabtn1, 
    ctabtn2, 
    codeblock, 
    backgroundGradient,
    codeColor = "text-green-400"
}) => {
  return (
    <div className={` relative  py-20 ${backgroundGradient} overflow-hidden`}>
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-500 rounded-full blur-3xl animate-pulse-medium"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`flex flex-col ${position} gap-16 items-center justify-between`}>
          
          <div className='flex-1 flex flex-col gap-8'>
            {heading}
            
            <div className='text-gray-300 text-lg leading-relaxed max-w-2xl'>
              {subheading}
            </div>

            <div className='flex flex-col sm:flex-row gap-6 mt-4'>
              <CTAButton 
                variant={ctabtn1.variant} 
                className={`${ctabtn1.className} group`}  
                linkTo={ctabtn1.linkTo}
              >
                <div className="flex items-center">
                  {ctabtn1.text} 
                  <span className='ml-3 transition-transform duration-300 group-hover:translate-x-1'>
                    <FaArrowRight />
                  </span>
                </div>
              </CTAButton>
              
              <CTAButton 
                variant={ctabtn2.variant} 
                className={ctabtn2.className}  
                linkTo={ctabtn2.linkTo}
              >
                {ctabtn2.text}
              </CTAButton>
            </div>
          </div>

          <div className='flex-1 w-full max-w-2xl'>
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 transform hover:scale-105 transition-transform duration-300">
              <div className="bg-gray-900 px-6 py-4 border-b border-gray-700 flex items-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="ml-4 text-gray-400 text-sm">index.html</div>
              </div>

              <div className="flex">
                <div className="bg-gray-900 text-gray-500 text-sm py-4 px-4 text-right select-none">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(line => (
                    <div key={line} className="h-6 flex items-center justify-end pr-2">
                      {line}
                    </div>
                  ))}
                </div>

                <div className={`flex-1 py-4 px-6 font-mono text-sm ${codeColor} overflow-x-auto`}>
                  <TypeAnimation
                    sequence={[codeblock, 5000, ""]}
                    repeat={Infinity}
                    cursor={true}
                    style={{ whiteSpace: 'pre-wrap' }}
                    speed={75}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;