import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = () => {
  const navigate = useNavigate()
  const jobId = "hellojobshere"
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border-gray-200'>

<div className='flex items-center justify-between gap-3'>
  <p className='text-sm text-gray-600' >2 Days Ago</p>
  {/* Adjusted Bookmark Button (Smaller Width) */}
  <Button variant="outline" className="rounded-full w-8 h-8" size="icon">
    <Bookmark className="w-4 h-4" /> {/* Optional: Reduce icon size further */}
  </Button>
</div>

<div className='flex items-center gap-1 my-1'>
        <Button className="p-6" variant="outline" size="icon">  
            <Avatar>
<AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"/>
</Avatar>
</Button>
<div>
  <h1 className='font-md text-lg'>Company Name</h1>
  <p className='text-sm text-grey-600'>Pakistan</p>
</div>
</div>

<div>
<h1 className='font-bold text-lg my-2'>Title</h1>
<p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut asperiores dignissimos quasi. Animi vel consequuntur eveniet omnis velit nihil earum atque fugit ea quo non temporibus voluptates, quas, quasi vero!</p>
</div>

<div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">12 Positions</Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">Part Time</Badge>
        <Badge className="text-[#7290b7] font-bold" variant="ghost">24LPA</Badge>
      </div>

      <div className='flex items-center gap-4 mt-4 '>
        <Button onClick={() => navigate  (`/description/${jobId}`)} variant="outline">Details</Button>
<Button className="bg-[#6A38C2] hover:bg-[#5c2fae] transition-colors duration-200">
  Save For Later
</Button>
      </div>

    </div>
  )
}

export default Job