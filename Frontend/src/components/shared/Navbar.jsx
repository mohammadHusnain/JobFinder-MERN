import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { User2, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleApplyClick = () => {
    setLoading(true);
    // Open the popup immediately to avoid popup blocking
    const popup = window.open('/job.html', '_blank', 'width=800,height=600');
    
    // Show loading state for 5 seconds
    setTimeout(() => {
      setLoading(false);
      // Focus the popup after loading
      if (popup && !popup.closed) {
        popup.focus();
      }
    }, 5000);
  };

  return (
    <div className="bg-white shadow">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16 relative px-4">
        {/* Left - Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            JOB <span className="text-blue-600">FINDER</span>
          </h1>
        </div>

        {/* Center - Apply Online Button */}
        <div className="absolute left-1/2 -translate-x-1/2">
          {user?.role === "JobSeeker" && (
            <>
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-blue-600 font-medium text-sm">Finding The Best Jobs...</p>
                </div>
              ) : (
                <button
                  onClick={handleApplyClick}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 transition"
                >
                  Apply Online
                </button>
              )}
            </>
          )}
        </div>

        {/* Right - Nav & Auth */}
        <div className="flex items-center gap-7">
          <ul className="flex font-medium items-center gap-5">
            {user?.role === "Recruiter" ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button className="bg-gray-800 text-white hover:bg-gray-900">Sign Up</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="User" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user?.role?.toLowerCase() === 'jobseeker' && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer mb-2">
                      <User2 />
                      <Button variant="link" asChild>
                        <Link to="/profile">Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
