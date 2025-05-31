import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { User2, LogOut } from "lucide-react";


const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        <div className="flex items-center gap-7">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>

          <Popover>
            <PopoverTrigger asChild>
<Avatar className="cursor-pointer">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      </Avatar >           
       </PopoverTrigger>
            <PopoverContent className="w-80">

<div className="flex gap-4 space-y-2">
<Avatar className="cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />

              </Avatar>
              <div>

              <h4 className="font-medium">Muhammad Husnain</h4>
              <p className="text-sm text-muted-foreground">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit iure, voluptatibus aliquid asperiores velit veniam accusantium quas incidunt eos dolores officiis. Ab ipsa nesciunt sequi illo, fugit sit impedit voluptate!</p>
              </div>
</div>
<div className="flex flex-col my-2 text-gray-600">

  <div className="flex w-fit items-center gap-2 cursor-pointer">
    <User2 />
    <Button variant="link">View Profile</Button>
  </div>

  <div className="flex w-fit items-center gap-2 cursor-pointer">
    <LogOut />
    <Button variant="link">Logout</Button>
  </div>
  
</div>


              
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
