import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'

const Job = () => {
  return (
    <div>
        <p>2 Days Ago</p>
        <Button variant="outline" className="rounded-full " size="icon"> <Bookmark/> </Button>

        <Button className="p-6" variant="outline" size="icon">  
            <Avatar>
<AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"/>
</Avatar>
</Button>
    </div>
  )
}

export default Job