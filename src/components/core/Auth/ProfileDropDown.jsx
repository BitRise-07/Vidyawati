import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { FiSettings, FiUser, FiBookOpen } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  


  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  const handleLogout = () => {
    dispatch(logout(navigate))
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 group relative"
      >
        {/* Profile Image */}
        <div className="relative">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=F9872C&color=fff&size=40`
            }}
          />
          {/* Online Indicator */}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        
        {/* Dropdown Icon */}
        <AiOutlineCaretDown 
          className={`text-vd-secondary transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
        
        {/* Hover Effect Background */}
        <div className="absolute inset-0 -m-2 rounded-full bg-gradient-to-r from-[#F9872C]/10 to-[#7C41C0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
          {/* Dropdown Arrow */}
          <div className="absolute -top-2 right-4 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>
          
          {/* User Info Section */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F9872C] to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                <img className="rounded-full" src={user.image} />
                {!user?.image && (
                  <span>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-vd-secondary truncate">
                  {user?.firstName} {user?.lastName}
                </h3>
                <p className="text-sm text-vd-muted truncate">{user?.email}</p>
              </div>
            </div>
            <div className="mt-3 text-xs text-vd-muted bg-gray-50 p-2 rounded-lg">
              <span className="font-medium text-[#F9872C]">
                {user?.accountType}
              </span>
              </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link 
              to="/dashboard/my-profile" 
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors duration-200 group/item"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors duration-200">
                <FiUser className="text-sm" />
              </div>
              <span className="font-medium text-vd-secondary group-hover/item:text-vd-primary">My Profile</span>
            </Link>

            <Link 
              to="/dashboard/my-profile" 
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors duration-200 group/item"
            >
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 group-hover/item:bg-green-500 group-hover/item:text-white transition-colors duration-200">
                <VscDashboard className="text-sm" />
              </div>
              <span className="font-medium text-vd-secondary group-hover/item:text-vd-primary">Dashboard</span>
            </Link>

            <Link 
              to="/dashboard/my-courses" 
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors duration-200 group/item"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 group-hover/item:bg-purple-500 group-hover/item:text-white transition-colors duration-200">
                <FiBookOpen className="text-sm" />
              </div>
              <span className="font-medium text-vd-secondary group-hover/item:text-vd-primary">My Courses</span>
            </Link>

            <Link 
              to="settings/edit-profile" 
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors duration-200 group/item"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 group-hover/item:bg-gray-500 group-hover/item:text-white transition-colors duration-200">
                <FiSettings className="text-sm" />
              </div>
              <span className="font-medium text-vd-secondary group-hover/item:text-vd-primary">Settings</span>
            </Link>
          </div>

          {/* Logout Section */}
          <div className="border-t border-gray-100 p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#F9872C] to-orange-500 text-white font-medium py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group/btn"
            >
              <VscSignOut className="text-lg group-hover/btn:-translate-x-1 transition-transform duration-300" />
              <span>Logout</span>
            </button>
            
            {/* Help Link */}
            <div className="mt-3 text-center">
              <Link 
                to="/help" 
                className="text-xs text-vd-muted hover:text-[#F9872C] transition-colors duration-200"
                onClick={() => setOpen(false)}
              >
                Need Help?
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  )
}