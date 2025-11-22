import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const ACCENT = "cyan-500";
  const navigate = useNavigate();
  const handleLogout = (e) => {
    toast.success("Logout Successfully");
    navigate("/");
  }

  return (
    <nav className="fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg bg-${ACCENT} flex items-center justify-center`}
            >
              <img
                src="https://imgs.search.brave.com/utT25WVux7fu6UdlgoinfQQGZOjbmgUOAfG958an2SE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTk4/NDc5MzcxMy92ZWN0/b3IvZ3JhcGgtbW92/aW5nLXVwd29yZHMt/aWNvbi5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9S0lCdHZI/OFNBZHdyQmJDRXQ0/T1lKempmclR5U21L/d3BMb0FxRGNtODB5/WT0"
                alt=""
                className="h-10 w-10 rounded-md"
              />
            </div>
            <span className="text-2xl font-bold text-white">StockMaster</span>
          </div>

          <div>
            <button className="px-4 py-2 text-white border bg-blue-400 hover:text-red-400 hover:bg-transparent rounded" onClick={handleLogout}> 
              LogOut
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
