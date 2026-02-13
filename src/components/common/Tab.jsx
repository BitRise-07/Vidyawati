export default function Tab({ tabData, field, setField }) {
  return (
    <div className="flex bg-gray-100 rounded-xl p-1 mb-6 w-full">
      {tabData.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setField(tab.type)}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
            field === tab.type
              ? tab.type === "student"
                ? "bg-[#F9872C] text-white shadow-md"
                : "bg-[#7C41C0] text-white shadow-md"
              : "text-vd-txt hover:text-vd-secondary"
          }`}
        >
          {tab.tabName}
        </button>
      ))}
    </div>
  )
}
