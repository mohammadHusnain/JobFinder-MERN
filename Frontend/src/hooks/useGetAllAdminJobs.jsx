import { setAllAdminJobs } from '../redux/jobSlice'
import { JOB_API_END_POINT } from '../../src/components/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
                console.log('Admin Jobs Data:', res.data); // Debug log
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs || []));
                }
            } catch (error) {
                console.error('Error fetching admin jobs:', error);
            }
        }
        fetchAllAdminJobs();
    },[dispatch])
}

export default useGetAllAdminJobs;