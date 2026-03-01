import React, { useEffect, useState } from 'react'
import { FaPlus, FaTimes } from "react-icons/fa"

const RequirementField = ({name, label, register, errors, setValue, getValues}) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, [])

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList])

    const handleAddRequirement = () => {
        if(requirement.trim()) {
            setRequirementList([...requirementList, requirement.trim()]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-vd-secondary">
        {label} <sup className="text-red-500">*</sup>
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          placeholder="Enter a requirement"
          className="flex-1 px-4 py-2.5 rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all duration-300 text-vd-secondary placeholder:text-vd-muted"
          onKeyPress={(e) => e.key === 'Enter' && handleAddRequirement()}
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="px-5 py-2.5 bg-gradient-to-r from-[#F9872C] to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer"
        >
          <FaPlus />
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {requirementList.map((item, index) => (
          <li
            key={index}
            className="group flex justify-between items-center bg-gradient-to-r from-white to-orange-50 px-4 py-3 rounded-lg border border-orange-100 hover:border-orange-300 transition-all duration-300"
          >
            <span className="text-vd-secondary">{item}</span>
            <button
              type="button"
              onClick={() => handleRemoveRequirement(index)}
              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors duration-300 rounded hover:bg-red-50"
            >
              <FaTimes />
            </button>
          </li>
        ))}
      </ul>

      {errors[name] && (
        <span className="text-sm text-red-600 flex items-center gap-1">
          <span>⚠</span> Please add at least one requirement
        </span>
      )}
    </div>
  )
}

export default RequirementField