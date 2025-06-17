// CompaniesTable.tsx
import React from 'react';
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

const CompaniesTable = () => {

  const {companies} = useSelector(store => store.company)

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
                companies?.map((company)=>{
                  return(
<div key={company._id}>
<TableRow>
            <TableCell>
              <Avatar>
                <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{company.name}</TableCell>
            <TableCell>{company.createdAt.split('T')[0]}</TableCell>
            <TableCell className="text-right cursor-pointer">
              <Popover>
                <PopoverTrigger> <MoreHorizontal/>
                  {/* <button className="text-sm text-blue-600 flex items-center gap-1">
                    ✏️ Edit
                  </button> */}
                </PopoverTrigger>
                <PopoverContent className="w-32 bg-white border shadow-md p-2 rounded">
                  <div className="flex items-center gap-2">
                    <Edit2 size={16} />
                    <span>Edit</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
</div>
                  )
                })
              }
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
