// import React from 'react';
// import { useSelector } from 'react-redux'; 
// import LatestJobCards from './LatestJobCards';

// const LatestJobs = () => {
//     const jobs = useSelector(store => store.job?.allJobs || []);
   
//     return (
//         <section className="max-w-7xl mx-auto px-5 py-16">
//             <div className="text-center mb-12">
//                 <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
//                     <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
//                 </h1>
                
//                 <p className="text-gray-600 max-w-2xl mx-auto">
//                     Discover the most exciting career opportunities in Pakistan's growing market
//                 </p>
//             </div>
            
//             {jobs.length === 0 ? (
//                 <div className="text-center py-12 bg-gray-50 rounded-xl">
//                     <p className="text-gray-500">No job openings available at the moment</p>
//                     <p className="text-sm text-gray-400 mt-1">New opportunities coming soon</p>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {jobs.slice(0, 6).map(job => (
//                         <LatestJobCards key={job._id} job={job} />
//                     ))}
//                 </div>
//             )}
            
//             {jobs.length > 6 && (
//                 <div className="mt-10 text-center">
//                     <button className="px-6 py-3 bg-[#6A38C2] text-white font-medium rounded-lg hover:bg-[#5D30B0] transition-colors shadow-sm">
//                         View All Opportunities
//                     </button>
//                 </div>
//             )}
//         </section>
//     );
// };

// export default LatestJobs;

import React from 'react'
import LatestJobCards from './LatestJobCards'

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8]

const LatestJobs = () => {
  return (
    <div className="max-w-7xl mx-auto my-20">
      
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>
      
      <div className="grid grid-cols-3 gap-4 my-5">
        {
          randomJobs.slice(0, 6).map((item, index) => (
            <LatestJobCards key={index} />
          ))
        }
      </div>

    </div>
  )
}

export default LatestJobs
