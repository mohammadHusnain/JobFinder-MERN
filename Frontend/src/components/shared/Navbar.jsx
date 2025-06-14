import React from "react";
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
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () =>{

    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true})
      if(res.data.success){
        dispatch(setUser(null))
        navigate('/');
        toast.success(res.data.message)
      }
    }
     catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
      
    }
  }
  
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            JOB <span className="text-blue-600">FINDER</span>
          </h1>
        </div>

        <div className="flex items-center gap-7">
          <ul className="flex font-medium items-center gap-5">
            <Link to='/'>Home</Link>
            <Link to='/jobs'>Jobs</Link>
            <Link to='/browse'>Browse</Link>
          </ul>

          {
            !user ? (

              <div className="flex items-center gap-2">
                <Link to="/login">  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">  <Button className="bg-gray-800 text-white hover:bg-gray-900">Sign Up</Button>
                </Link>
              </div>

            ) : (

              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                  </Avatar >
                </PopoverTrigger>
                <PopoverContent className="w-80">

                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />

                    </Avatar>
                    <div>

                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link"> <Link to='/profile'> View Profile </Link></Button>
                    </div>

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">Logout</Button>
                    </div>

                  </div>

                </PopoverContent>
              </Popover>

            )
          }


        </div>
      </div>
    </div>
  );
};

export default Navbar;
