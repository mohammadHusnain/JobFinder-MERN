import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useSelector } from 'react-redux';
import useGetAllJobs from '../hooks/useGetAllJobs';

// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);

    // Filter jobs based on searchedQuery
    const filteredJobs = searchedQuery
        ? allJobs.filter(job =>
            job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            (job.company?.name?.toLowerCase().includes(searchedQuery.toLowerCase()))
        )
        : allJobs;

    // Debug logs
    console.log("All jobs:", allJobs);
    console.log("Searched query:", searchedQuery);
    console.log("Filtered jobs:", filteredJobs);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({filteredJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        filteredJobs.length === 0
                        ? <div className="col-span-3 text-center text-gray-500">No jobs found for your search.</div>
                        : filteredJobs.map((job) => (
                            <Job key={job._id} job={job}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse