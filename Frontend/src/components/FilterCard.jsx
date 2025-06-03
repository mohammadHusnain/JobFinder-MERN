import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const fitlerData = [
  {
    fitlerType: "Location",
    array: [
      "Karachi",
      "Lahore",
      "Islamabad",
      "Rawalpindi",
      "Multan",
      "Quetta"
    ]
  },
  {
    fitlerType: "Industry",
    array: [
      "Frontend Development",
      "Backend Development",
      "Full Stack Development",
      "Mobile App Development",
      "Machine Learning & AI",
      "QA & Testing"
    ]
  },
  {
    fitlerType: "Salary",
    array: [
      "PKR 50,000 - 100,000",
      "PKR 100,000 - 200,000",
      "PKR 200,000 - 400,000",
      "PKR 400,000 - 600,000",
    ]
  }
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-5 rounded-md shadow-sm border border-gray-200">
      <h1 className="font-bold text-xl text-gray-800 mb-3">Filter Jobs</h1>
      <hr className="mb-4" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {fitlerData.map((data, index) => (
          <div key={index} className="mb-5">
            <h2 className="font-semibold text-gray-700 text-lg mb-2">{data.fitlerType}</h2>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId} className="text-gray-600">{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
