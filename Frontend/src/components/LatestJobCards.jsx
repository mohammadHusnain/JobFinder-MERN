// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Badge } from './ui/badge';

// const LatestJobCards = ({ job }) => {
//     const navigate = useNavigate();
    
//     return (
//         <div 
//             onClick={() => navigate(`/description/${job._id}`)} 
//             className="p-6 bg-white rounded-xl border border-gray-200 hover:border-[#6A38C2]/50 hover:shadow-lg transition-all duration-200 cursor-pointer group"
//         >
//             <div className="flex items-start gap-4 mb-4">
//                 <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-[#6A38C2]/10 transition-colors">
//                     {job?.company?.logo ? (
//                         <img src={job.company.logo} alt={job.company.name} className="w-10 h-10 object-contain" />
//                     ) : (
//                         <span className="text-xl font-bold text-[#6A38C2]">
//                             {job?.company?.name?.charAt(0)}
//                         </span>
//                     )}
//                 </div>
//                 <div>
//                     <h1 className="font-semibold text-gray-900 group-hover:text-[#6A38C2] transition-colors">
//                         {job?.company?.name || 'Company'}
//                     </h1>
//                     <p className="text-gray-500 text-sm">Pakistan • {new Date(job?.createdAt).toLocaleDateString()}</p>
//                 </div>
//             </div>
            
//             <h2 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-[#6A38C2] transition-colors">
//                 {job?.title}
//             </h2>
//             <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                 {job?.description}
//             </p>
            
//             <div className="flex flex-wrap gap-2">
//                 <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100">
//                     {job?.position} Positions
//                 </Badge>
//                 <Badge className="bg-red-50 text-[#F83002] hover:bg-red-100">
//                     {job?.jobType}
//                 </Badge>
//                 <Badge className="bg-purple-50 text-[#7209b7] hover:bg-purple-100">
//                     {job?.salary}LPA
//                 </Badge>
//             </div>
//         </div>
//     );
// };

// export default LatestJobCards;

import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCards = ({job}) => {
  return (
    <div className="p-8 m-2 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">Pakistan</p>
      </div>

      <div className="mt-4">
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
{
  job?.description 
}        </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} Positions</Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-[#7290b7] font-bold" variant="ghost">{job?.salary}K</Badge>
      </div>
      
    </div>
  )
}

export default LatestJobCards
