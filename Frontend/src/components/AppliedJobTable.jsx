import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const { allAppliedJobs } = useSelector(store => store.job);
    console.log("Applicants in table:", allAppliedJobs);

    const filteredJobs = searchedQuery
    ? allJobs.filter(job =>
        job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        (job.company?.name?.toLowerCase().includes(searchedQuery.toLowerCase()))
    )
    : allJobs;

    const jobTitle = allJobs.find(job => job._id === allAppliedJobs[0]?.job?._id)?.title || "Job";

    return (
        <div>
            <h1 className="font-bold text-xl my-5">
                Applicants for {jobTitle} ({allAppliedJobs.length})
            </h1>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> :
                        allAppliedJobs
                            .filter(appliedJob => filteredJobs.some(job => job._id === appliedJob.job?._id))
                            .map((appliedJob) => (
                                <TableRow key={appliedJob._id}>
                                    <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell>{appliedJob.job?.title}</TableCell>
                                    <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                    <TableCell className="text-right"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
                                </TableRow>
                            ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable