import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { toast } from 'sonner'


const Login = () => {

  const [input, setInput] = useState({
          email: "",
          password: "",
          role: "",
      });

      const navigate = useNavigate()
  
      const changeEventHandler = (e) =>{
          setInput({...input , [e.target.name]:e.target.value})
      }

   const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                // dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } 
        // finally {
        //     dispatch(setLoading(false));
        // }
    }
  

  return (
 <>

    <Navbar/>

<div className="flex items-center justify-center max-w-7xl mx-auto">
  <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
    <h1 className="font-bold text-xl mb-5">Login</h1>

    <div className="my-2">
      <Label>Email</Label>
      <Input
        type="email"
         value={input.email}
        name="email"
        onChange={changeEventHandler}
        placeholder="Ahsansheikh@gmail.com"
      />
    </div>

    <div className="my-2">
      <Label>Password</Label>
      <Input
        type="text"
         value={input.password}
        name="password"
        onChange={changeEventHandler}
        placeholder="*********"
      />
    </div>

    <div className="flex items-center justify-between">
        
   <RadioGroup className="space-y-2">
  <div className="flex items-center gap-2">
    <input
      id="r1"
      type="radio"
      name="role"
      value="JobSeeker"
      checked={input.role === 'JobSeeker'}
      onChange={changeEventHandler}
      className="h-5 w-5 text-black cursor-pointer"
    />
    <label htmlFor="r1" className="text-base font-medium">Job Seeker</label>
  </div>

  <div className="flex items-center gap-2">
    <input
      id="r2"
      type="radio"
      name="role"
      value="Recruiter"
      checked={input.role === 'Recruiter'}
      onChange={changeEventHandler}
      className="h-5 w-5 text-black cursor-pointer"
    />
    <label htmlFor="r2" className="text-base font-medium">Recruiter</label>
  </div>
</RadioGroup>


    </div>

    <Button type="submit" className="w-full my-4">Login</Button>
    <span className='text-sm'>Don't Have An Account ? <Link to='/signup' className='text-blue-600 '>Sign Up</Link></span>

  </form>
</div>

</>

  )
}

export default Login