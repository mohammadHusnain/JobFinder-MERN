import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <section className="text-center py-16 px-4 bg-white">
      <div className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
       <span className="px-3 py-1.5 rounded-full bg-gray-50 text-blue-600 font-medium text-xs tracking-wider uppercase border border-gray-100">
    #1 Job Search Platform
</span>

        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          Discover, Apply, and Land Your <br />
          <span className="text-[#6A38C2]">Dream Job</span>
        </h1>

        <p className="text-gray-600 text-base sm:text-lg max-w-xl">
          Your career journey starts here. Explore thousands of jobs from top companies and take the next step toward your future.
        </p>

        <div className="flex w-full max-w-xl shadow-md border border-gray-200 pl-4 rounded-full items-center gap-3 bg-white">
          <input
            type="text"
            placeholder="Search job titles, companies, or keywords"
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none border-none bg-transparent py-2 text-sm"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6A38C2] hover:bg-[#5731a5] transition-colors"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
