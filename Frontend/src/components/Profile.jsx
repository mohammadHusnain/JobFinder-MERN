import React from 'react'
import Navbar from './shared/Navbar'
import { Avatar } from './ui/avatar'
import { AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'

const Profile = () => {
  return (
    <div>
        <Navbar/>

        <div className='max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>

            <div className='flex justify-between'> 
<div className='flex items-center gap-4'>
            <Avatar className="h-18 w-20">
                <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profilePic"/>
            </Avatar>

            <div>
            <h1 className='font-medium text-xl'>Full Name</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis nemo, non, similique distinctio placeat eaque repellendus accusamus amet earum reiciendis deleniti! Quisquam impedit incidunt saepe iusto suscipit nobis eveniet assumenda!</p>
            </div>

        </div>

<Button className='text-right' variant='outline'><Pen/></Button> 
            </div>

        <div>

<div className="flex items-center gap-3 my-2">
    <Mail/>
            <span>husnain@gmail.com</span>
</div>

<div className="flex items-center gap-3 my-2">
            <Contact/>
            <span>6543212450</span>
</div>

        </div>

     </div>

</div>
  )
}

export default Profile