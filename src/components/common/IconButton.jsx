import React from 'react'

const IconButton = ({
    text,
    onClick,
    children,
    disabled = false,
    outline = false,
    customClasses = "",
    type = "button",
}) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:bg-gray-300 cursor-pointer  disabled:border-gray-300";
    
    const variantClasses = outline
        ? "border-2 border-vd-secondary text-orange-500 hover:bg-vd-secondary  px-5 py-3"
        : "bg-gradient-to-r from-[#F9872C] to-orange-500 text-white hover:bg-vd-secondary  px-6 py-3.5";

    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={`${baseClasses} ${variantClasses} ${customClasses}`}
        >
            {children ? (
                <>
                    {children}
                    <span>{text}</span>
                </>
            ) : (
                text
            )}
        </button>
    )
}

export default IconButton