import React from 'react'
import Logo1 from "../../../assets/images/Logo1.svg"
import Logo2 from "../../../assets/images/Logo2.svg"
import Logo3 from "../../../assets/images/Logo3.svg"
import Logo4 from "../../../assets/images/Logo4.svg"
import TimeLineImage from "../../../assets/images/TimelineImage.png"

const TimelineSection = () => {

   const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    description: "Fully committed to the success company",
    stats: "95% Success Rate",
    color: "from-[#F9872C] to-orange-400",
    delay: "100ms",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
    stats: "24/7 Support",
    color: "from-[#7C41C0] to-purple-500",
    delay: "200ms",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skills",
    stats: "100+ Skills",
    color: "from-[#F9872C] to-orange-500",
    delay: "300ms",
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
    stats: "500+ Projects",
    color: "from-[#7C41C0] to-purple-600",
    delay: "400ms",
  },
];


  return (
    <div className="px-6 mx-auto py-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Content - Timeline Items */}
            <div className="flex-1">
                <h2 className="text-4xl lg:text-4xl font-bold text-vd-secondary leading-tight mb-8">
                    Get the skills you need for a{" "}
                    <span className="text-vd-primary">job that is in demand.</span>
                </h2>

                <div className="space-y-8">
                    {timeline.map((element, index) => {
                        return (
                            <div 
                                className='flex items-start gap-6 group '
                                key={index}
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${element.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    <img 
                                        src={element.Logo} 
                                        alt={element.heading}
                                        className="w-8 h-8 filter brightness-0 invert"
                                    />
                                </div>
                                
                                {/* Text Content */}
                                <div className="flex-1">
                                    <h2 className='font-bold text-xl text-vd-secondary mb-2 group-hover:text-vd-primary transition-colors duration-300'>
                                        {element.heading}
                                    </h2>
                                    <p className='text-vd-txt text-base leading-relaxed'>
                                        {element.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='flex-1 relative'>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                    <img 
                        src={TimeLineImage} 
                        alt='timelineimage' 
                        className='w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105' 
                    />
                    
                    
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-vd-secondary/90 to-vd-primary/90 backdrop-blur-sm rounded-2xl flex flex-row text-white py-6 px-8 shadow-2xl border border-white/20">
                        
                        {/* Years of Experience */}
                        <div className='flex flex-row items-center border-r border-white/30 gap-5 pr-8'>
                            <p className='text-3xl font-bold text-white'>10</p>
                            <p className='text-sm font-semibold uppercase tracking-wider max-w-[80px]'>
                                Years of <br />Experience
                            </p>
                        </div>
                        
                        {/* Types of Courses */}
                        <div className="flex flex-row items-center gap-5 pl-8">
                            <p className='text-3xl font-bold text-white'>250</p>
                            <p className='text-sm font-semibold uppercase tracking-wider max-w-[80px]'>
                                Types of <br />Courses
                            </p>
                        </div>
                    </div>

                    
                    
                    <div className="absolute top-6 left-6 bg-[#F9872C] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                        <span className="text-sm font-bold">⭐</span>
                    </div>
                </div>

                {/* Background Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500 opacity-10 rounded-full blur-xl -z-10"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-500 opacity-10 rounded-full blur-xl -z-10"></div>
            </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
            <button className="bg-[#F9872C] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-vd-secondary transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Learn More
            </button>
        </div>
    </div>
  )
}

export default TimelineSection