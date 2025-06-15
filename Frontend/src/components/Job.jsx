import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
  const navigate = useNavigate()
  // const jobId = "hellojobshere"

  const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border-gray-200'>

<div className='flex items-center justify-between gap-3'>
  <p className='text-sm text-gray-600' >{daysAgoFunction(job?.createdAt) ===  0 ? "Today" : `${daysAgoFunction(job?.createdAt)} Days Ago`}</p>
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
  <h1 className='font-md text-lg'>{job?.company?.name}</h1>
  <p className='text-sm text-grey-600'>Pakistan</p>
</div>
</div>

<div>
<h1 className='font-bold text-lg my-2'>{job?.title}</h1>
<p className='text-sm text-gray-600'>{job?.description}</p>
</div>

<div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} Positions</Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-[#7290b7] font-bold" variant="ghost">{job?.salary}K</Badge>
      </div>

      <div className='flex items-center gap-4 mt-4 '>
        <Button onClick={() => navigate  (`/description/${job?._id}`)} variant="outline">Details</Button>
<Button className="bg-[#6A38C2] hover:bg-[#5c2fae] transition-colors duration-200">
  Save For Later
</Button>
      </div>

    </div>
  )
}

export default Job