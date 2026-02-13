import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaHashtag } from "react-icons/fa";

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course);
  const [chips, setChips] = useState([]);

  useEffect(() => {
    if (editCourse && course?.tag) {
      setChips(course.tag);
    }
    register(name, { 
      required: `${label} are required`,
      validate: (value) => value.length > 0 
    });
  }, []);

  useEffect(() => {
    setValue(name, chips);
  }, [chips]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = event.target.value.trim();
      if (chipValue && !chips.includes(chipValue)) {
        const newChips = [...chips, chipValue];
        setChips(newChips);
        event.target.value = "";
      }
    }
  };

  const handleDeleteChip = (chipIndex) => {
    const newChips = chips.filter((_, index) => index !== chipIndex);
    setChips(newChips);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-vd-secondary">
        {label} <sup className="text-red-500">*</sup>
      </label>
      
      <div className={`flex flex-wrap gap-2 rounded-xl border-2 p-3 transition-all duration-300 ${
        errors[name] 
          ? "border-red-300 focus-within:border-red-500 bg-red-50" 
          : "border-orange-100 focus-within:border-orange-500 bg-orange-50/50 focus-within:bg-white"
      }`}>
        <div className="flex items-center gap-2 text-vd-muted">
          <FaHashtag />
        </div>
        
        {chips.map((chip, index) => (
          <div
            key={index}
            className="group flex items-center gap-2 bg-gradient-to-r from-orange-100 to-orange-50 px-3 py-1.5 rounded-lg border border-orange-200"
          >
            <span className="text-sm text-vd-secondary font-medium">{chip}</span>
            <button
              type="button"
              onClick={() => handleDeleteChip(index)}
              className="p-0.5 text-gray-400 hover:text-red-500 transition-colors duration-300 rounded hover:bg-red-50"
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
        
        <input
          id={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="flex-1 outline-none text-sm bg-transparent text-vd-secondary placeholder:text-vd-muted min-w-[120px]"
        />
      </div>
      
      {errors[name] && (
        <span className="text-sm text-red-600 flex items-center gap-1">
          <span>⚠</span> {errors[name]?.message}
        </span>
      )}
      
      <p className="text-xs text-vd-muted">
        Press Enter or comma (,) to add tags
      </p>
    </div>
  );
}