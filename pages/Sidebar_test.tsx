import { useState } from "react";
import ViewAllitem from "@/components/admin/ViewAllProduct";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="block">
      {/* Button */}
      <button
        className="fixed z-10 m-2 p-2 bg-gray-800 text-white rounded-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "Close" : "Open"}
      </button>
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"
        } transition-transform duration-300 ease-in-out fixed inset-y-0 left-0 w-64 bg-gray-200 overflow-y-auto transform`}
      ></div>
    </div>
  );
};

export default Sidebar;
