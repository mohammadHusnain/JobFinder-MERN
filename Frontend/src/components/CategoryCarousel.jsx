import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
     "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "ML Engineer",
    "UI/UX Designer",
    "Full-Stack Developer",
    "DevOps Engineer",
    "Product Manager"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleJobSearch = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <section className="py-10 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Explore Career Paths
                </h2>
                <Carousel 
                    opts={{ 
                        align: "start",
                        loop: true
                    }} 
                    className="w-full max-w-3xl mx-auto"
                >
                    <CarouselContent>
                        {category.map((item, index) => (
                            <CarouselItem 
                                key={`${item}-${index}`} 
                                className="md:basis-1/2 lg:basis-1/3 px-2"
                            >
                                <Button
                                    onClick={() => handleJobSearch(item)}
                                    variant="outline"
                                    className="rounded-full w-full py-5 border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    {item}
                                </Button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>
            </div>
        </section>
    );
};

export default CategoryCarousel;