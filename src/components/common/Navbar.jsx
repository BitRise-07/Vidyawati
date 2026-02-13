import React, { useEffect, useState } from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import Logo from "../../assets/images/logo_main.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { LuShoppingCart } from "react-icons/lu";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { fetchCourseCategories } from "../../services/operations/courseDetailsApi";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [subLinks, setSublinks] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();

      if (categories.length != 0) {
        setSublinks(categories);
      }
      setLoading(false);
    };
    getCategories();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Implement search functionality here
      setIsSearchVisible(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Navbar Container */}
      <div
        className={`fixed top-0 left-0 right-0 z-50  transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-100"
            : "bg-orange-50  border-orange-100"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 z-50">
            <img
              src={Logo}
              width={160}
              height={35}
              loading="lazy"
              alt="Vidyawati Logo"
              className="transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center flex-1 justify-center">
            <ul className="flex gap-x-6 lg:gap-x-8 text-vd-secondary">
              {NavbarLinks.map((link, index) => (
                <li key={index} className="relative group">
                  {link.title === "Catalog" ? (
                    <div className="flex items-center gap-1.5 cursor-pointer py-2 px-3 rounded-lg hover:bg-orange-50 transition-colors duration-300">
                      <p className="font-semibold group-hover:text-vd-primary transition-colors duration-300">
                        {link.title}
                      </p>
                      <IoIosArrowDown className="mt-0.5 text-vd-muted group-hover:text-vd-primary transition-colors duration-300" />

                      {/* Dropdown Menu */}
                      <div className="invisible absolute left-1/2 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 transform -translate-x-1/2 translate-y-4 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 z-50">
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-2 w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45"></div>
                        <div className="p-4">
                          <h3 className="font-bold text-vd-secondary mb-3 text-sm uppercase tracking-wider">
                            Browse Categories
                          </h3>
                          <div className="grid grid-cols-1 gap-2">
                            {
                              loading ? (
                                <p className="text-center">Loading...</p>
                              ):(
                                subLinks.map((sublink, index) => (
                              <Link
                                to={`/catalog/${sublink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                key={index}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 transition-colors duration-300 group/item"
                              >
                                <span className="text-vd-secondary font-medium group-hover/item:text-vd-primary transition-colors duration-300">
                                  {sublink.name}
                                </span>
                                <span className="text-vd-muted text-xs opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                                  →
                                </span>
                              </Link>
                            ))
                              )
                            }
                            
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <Link
                              to="/catalog"
                              className="block w-full text-center bg-gradient-to-r from-[#F9872C] to-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                            >
                              View All Courses
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link to={link.path}>
                      <div
                        className={`py-2 px-3 rounded-lg transition-all duration-300 whitespace-nowrap ${
                          matchRoute(link.path)
                            ? "bg-orange-50 text-vd-primary font-semibold"
                            : "text-vd-secondary hover:bg-orange-50 hover:text-vd-primary"
                        }`}
                      >
                        {link.title}
                      </div>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-x-3 sm:gap-x-4">
            {/* Search - Desktop */}
            <div className="hidden sm:block relative">
              {isSearchVisible ? (
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center"
                >
                  <div className="flex items-center bg-white border border-orange-200 rounded-full px-4 py-2 shadow-sm">
                    <FiSearch className="text-vd-muted mr-2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search courses..."
                      className="outline-none text-sm w-40 lg:w-48 placeholder:text-vd-muted"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchVisible(false);
                        setSearchQuery("");
                      }}
                      className="ml-2 text-vd-muted hover:text-vd-secondary cursor-pointer"
                    >
                      <FiX className="text-lg" />
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchVisible(true)}
                  className="p-2 rounded-full hover:bg-orange-50 transition-colors duration-300 cursor-pointer"
                >
                  <FiSearch className="text-xl text-vd-secondary" />
                </button>
              )}
            </div>

            {/* Cart Icon */}
            {user && user?.accountType !== "Instructor" && (
              <Link
                to="/dashboard/cart"
                className="relative p-2 rounded-full hover:bg-orange-50 transition-colors duration-300 group"
              >
                <LuShoppingCart className="text-xl text-vd-secondary group-hover:text-vd-primary transition-colors duration-300" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#F9872C] to-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {/* Auth Buttons */}
            {token === null && (
              <div className="hidden sm:flex items-center gap-x-3">
                <Link to="/login">
                  <button className="text-vd-secondary font-semibold px-4 py-2 rounded-lg hover:text-vd-primary transition-colors duration-300 cursor-pointer whitespace-nowrap">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-gradient-to-r from-[#F9872C] to-orange-500 text-white font-semibold px-4 py-2.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 transform cursor-pointer whitespace-nowrap text-sm">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}

            {/* Profile Dropdown */}
            {token !== null && (
              <div className="ml-2">
                <ProfileDropDown />
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors duration-300"
            >
              {isMobileMenuOpen ? (
                <FiX className="text-2xl text-vd-secondary" />
              ) : (
                <FiMenu className="text-2xl text-vd-secondary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden px-4 pb-3">
          {isSearchVisible && (
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <div className="flex items-center bg-white border border-orange-200 rounded-full px-4 py-2 shadow-sm w-full">
                <FiSearch className="text-vd-muted mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  className="outline-none text-sm flex-1 placeholder:text-vd-muted"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchVisible(false);
                    setSearchQuery("");
                  }}
                  className="ml-2 text-vd-muted hover:text-vd-secondary cursor-pointer"
                >
                  <FiX className="text-lg" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu Panel */}
          <div className="absolute top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300">
            <div className="p-6 h-full overflow-y-auto">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-vd-secondary">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-orange-50 rounded-lg"
                >
                  <FiX className="text-2xl text-vd-secondary" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="mb-6">
                <div className="flex items-center bg-gray-50 rounded-full px-4 py-2">
                  <FiSearch className="text-vd-muted mr-2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="outline-none text-sm flex-1 bg-transparent placeholder:text-vd-muted"
                  />
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {NavbarLinks.map((link, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 last:border-0"
                  >
                    {link.title === "Catalog" ? (
                      <div className="pb-4">
                        <div className="flex items-center justify-between py-3">
                          <span className="font-semibold text-vd-secondary">
                            {link.title}
                          </span>
                          <IoIosArrowDown className="text-vd-muted" />
                        </div>
                        <div className="pl-4 space-y-2">
                          {subLinks.map((sublink, subIndex) => (
                            <Link
                              key={subIndex}
                              to={`/catalog/${sublink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="block py-2 text-vd-txt hover:text-vd-primary transition-colors duration-300"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {sublink.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        className={`block py-3 ${
                          matchRoute(link.path)
                            ? "text-vd-primary font-semibold"
                            : "text-vd-secondary hover:text-vd-primary"
                        } transition-colors duration-300`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.title}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              {token === null && (
                <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full py-3 border-2 border-vd-secondary text-vd-secondary font-semibold rounded-lg hover:bg-vd-secondary hover:text-white transition-colors duration-300">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full py-3 bg-gradient-to-r from-[#F9872C] to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
