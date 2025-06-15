// useGetAllJobs.js
import { JOB_API_END_POINT } from '@/components/utils/constant'
import { setAllJobs } from '@/redux/jobSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true // ✅ use withCredentials (not "Credential")
        });

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log('Error fetching jobs:', error);
      }
    };

    fetchAllJobs();
  }, []); // ✅ Only run once
};

export default useGetAllJobs;
