import React from 'react'

const BgAnimation = () => {
  return (
    <div>
                {/* Animated Background Shapes */}
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-500 opacity-10 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500 opacity-10 rounded-full blur-3xl animate-float-medium"></div>

          {/* Additional animated shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#F8B12F] opacity-5 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute bottom-40 right-40 w-40 h-40 bg-[#7C41C0] opacity-5 rounded-full blur-2xl animate-bounce-slow"></div>

          {/* Animated Top right stars */}
          <div className="animate-bounce-slow">
            <svg
              className="absolute top-5 right-6 w-12 h-12 animate-spin-slow"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 0L29.3518 16.5161L48 18.9959L34.1136 30.6308L37.4947 48L24 39.8142L10.5053 48L13.8864 30.6308L0 18.9959L18.6482 16.5161L24 0Z"
                fill="#F8B12F"
              />
              <path
                d="M42 0L46.5196 14.5058L64 16.892L50.5196 28.5375L53.8687 42L42 34.0264L30.1313 42L33.4804 28.5375L20 16.892L37.4804 14.5058L42 0Z"
                fill="white"
              />
            </svg>
          </div>

          <div className="animate-pulse">
            <svg
              className="absolute top-6 right-6 w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0L14.6759 8.25806L24 9.49793L17.0568 15.3154L18.7474 24L12 19.9071L5.25263 24L6.94316 15.3154L0 9.49793L9.32414 8.25806L12 0Z"
                fill="#F8B12F"
              />
            </svg>
          </div>

          {/* Animated Left side arc */}
          <div className="animate-float-slow">
            <svg
              className="absolute left-0 top-1/4 w-32 h-32"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 0C77.6142 0 100 22.3858 100 50H0C0 22.3858 22.3858 0 50 0Z"
                fill="white"
              />
              <path
                d="M99.5 49.5C99.5 77.0614 77.0614 99.5 49.5 99.5C21.9386 99.5 -0.5 77.0614 -0.5 49.5L-0.5 50C-0.5 77.3486 21.6514 99.5 49.5 99.5C77.3486 99.5 99.5 77.3486 99.5 50L99.5 49.5Z"
                stroke="#333333"
                strokeOpacity="0.5"
              />
            </svg>
          </div>

          {/* Animated Middle right shapes */}
          <div className="animate-spin-slow">
            <svg
              className="absolute right-30 top-1/6 w-24 h-24"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M50 0L100 50H0L50 0Z" fill="#F8B12F" />
              <path d="M50 50L100 0L50 100L0 0L50 50Z" fill="#F8B12F" />
            </svg>
          </div>

          {/* Animated Bottom right shapes */}
          <div className="animate-bounce-medium">
            <svg
              className="absolute right-0 bottom-15 w-24 h-24"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 0C77.6142 0 100 22.3858 100 50H0C0 22.3858 22.3858 0 50 0Z"
                fill="#7C41C0"
              />
            </svg>
          </div>
    </div>
  )
}

export default BgAnimation
