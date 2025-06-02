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
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'


const Signup = () => {

   const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    

const {loading} = useSelector(state => state.auth)
      const navigate = useNavigate()
      const dispatch = useDispatch();

    const changeEventHandler = (e) =>{
        setInput({...input , [e.target.name]:e.target.value})
    }

    const changeFileHandler = (e) =>{
        setInput({...input , file:e.target.files?.[0]})
    }

  const submitHandler = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("fullname", input.fullname);
  formData.append("email", input.email);
  formData.append("phoneNumber", input.phoneNumber);
  formData.append("password", input.password);
  formData.append("role", input.role);
  if (input.file) {
    formData.append("file", input.file);
  }

  try {
    dispatch(setLoading(true));
    const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
      headers: { 'Content-Type': "multipart/form-data" },
      withCredentials: true,
    });

    if (res.data.success) {
      navigate("/login");
      toast.success(res.data.message);
    }
  } catch (error) {
    console.error("Signup error:", error);

    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong. Please try again.");
    }
       
  }
    finally{
          dispatch(setLoading(false));  
        }
}

  return (
 <>
    <Navbar/>

<div className="flex items-center justify-center max-w-7xl mx-auto">
  <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
    <h1 className="font-bold text-xl mb-5">Sign Up</h1>


<div className="my-2">
      <Label>Full Name</Label>
      <Input
        type="text"
        value={input.fullname}
        name="fullname"
        onChange={changeEventHandler}
        placeholder="Ahsan Sheikh"
      />
    </div>

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
      <Label>Phone No</Label>
      <Input
        type="text"
         value={input.phoneNumber}
        name="phoneNumber"
        onChange={changeEventHandler}
        placeholder="000000000"
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

<div className="flex items-center gap-2">
    <Label className="text-slate-950 font-semibold">Profile</Label>
    <Input
    accept="image/*"
    type="file"
    onChange={changeFileHandler}
    className="cursor-pointer"
    />
</div>
    </div>

 {
loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please Wait ! </Button>    :     <Button type="submit" className="w-full my-4">Sign Up</Button>

    }    <span className='text-sm'>Already Have An Account ? <Link to='/login' className='text-blue-600 '>Login</Link></span>

  </form>
</div>

</>

  )
}

export default Signup