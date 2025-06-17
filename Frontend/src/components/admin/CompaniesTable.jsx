// CompaniesTable.tsx
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'; // Assuming you’re using shadcn/ui's avatar
import { Edit2, MoreHorizontal } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {

  const { companies , searchCompanyByText } = useSelector(store => store.company)
  const [filterCompany, setFilterCompany] = useState(companies)
  const navigate = useNavigate()

  useEffect(() => {

const filteredCompany = companies.length >= 0 && companies.filter((company)=>{

  if(!searchCompanyByText){
    return true;
  }
return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())


})

setFilterCompany(filteredCompany)
    
  }, [companies , searchCompanyByText])
  

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filterCompany?.map((company) => (
              
                  <TableRow>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={company.logo} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.createdAt.split('T')[0]}</TableCell>
                    <TableCell className="text-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger> <MoreHorizontal />
                          {/* <button className="text-sm text-blue-600 flex items-center gap-1">
                    ✏️ Edit
                  </button> */}
                        </PopoverTrigger>
                        <PopoverContent className="w-32 bg-white border shadow-md p-2 rounded">
                          <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2">
                            <Edit2 size={16} />
                            <span>Edit</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
