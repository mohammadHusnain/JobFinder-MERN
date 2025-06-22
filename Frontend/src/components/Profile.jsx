import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar } from './ui/avatar'
import { AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs'

// const skills = ["Javascript", "ReactJS", "Node", "Express", "NextJs", "NestJs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs()

    const [open,setOpen] = useState(false)
    const {user} = useSelector(store=>store.auth);


  return (
    <div>
        <Navbar/>

        <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>

            <div className='flex justify-between'> 
                <div className='flex items-center gap-4'>
                    <Avatar className="h-18 w-20">
                        <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profilePic"/>
                    </Avatar>

                    <div>
                        <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                        <p>{user?.profile?.bio}</p>
                    </div>
                </div>

                <Button onClick={()=> setOpen(true)} className='text-right' variant='outline'><Pen/></Button> 
            </div>

            <div>
                <div className="flex items-center gap-3 my-2">
                    <Mail/>
                    <span>{user?.email}</span>
                </div>

                <div className="flex items-center gap-3 my-2">
                    <Contact/>
                    <span>{user?.phoneNumber}</span>
                </div>
            </div>

            <div className="mt-4">
                <h1 className="font-medium text-lg mb-2">Skills</h1>
                <div className="flex flex-wrap gap-2">
                    {user?.profile?.skills.length !== 0 ? 
                        user?.profile?.skills.map((item, index) => (
                            <Badge key={index} className="whitespace-nowrap">
                                {item}
                            </Badge>
                        )) 
                        : 
                        <span>Not Applicable</span>
                    }
                </div>
            </div>

            <div className='grid w-full max-w-sm items-center gap-1'>
<Label className="text-md font-bold ">Resume</Label>
{
isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
}
            </div>

        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl">
<h1 className='font-bold text-lg my-5'>All Applied Jobs</h1>
{/* Application Table*/}
<AppliedJobTable/>
</div>
{/* <UpdateProfileDialog open={open}  setOpen={setOpen}/> */}
    </div>
  )
}

export default Profile