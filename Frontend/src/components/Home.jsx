import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import { FaSearch, FaUserTie, FaBuilding, FaRocket } from 'react-icons/fa';
import { useSpring, animated } from '@react-spring/web';
import AOS from 'aos';
import 'aos/dist/aos.css';
import gsap from 'gsap';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // Refs for GSAP animations
  const heroRef = useRef(null);
  const iconsRef = useRef([]);
  const imageRef = useRef(null);
  const catRef = useRef(null);
  const jobsRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [navigate, user?.role]);

  // GSAP maximal animations
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(imageRef.current, { opacity: 0, y: -60, scale: 0.7 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' });
    }
    if (iconsRef.current) {
      gsap.fromTo(iconsRef.current,
        { opacity: 0, y: 40, scale: 0.7 },
        { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.15, ease: 'back.out(1.7)' }
      );
    }
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 80, rotate: -3 }, { opacity: 1, y: 0, rotate: 0, duration: 1, delay: 0.2, ease: 'expo.out' });
    }
    if (catRef.current) {
      gsap.fromTo(catRef.current, { opacity: 0, x: 60, scale: 0.9 }, { opacity: 1, x: 0, scale: 1, duration: 1, delay: 0.4, ease: 'expo.out' });
    }
    if (jobsRef.current) {
      gsap.fromTo(jobsRef.current, { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, delay: 0.6, ease: 'expo.out' });
    }
  }, []);

  // React Spring animation for icons
  const iconSpring = useSpring({
    from: { scale: 0.7, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    config: { tension: 180, friction: 12 },
    delay: 400
  });

  // Dark mode palette
  const darkBg = 'bg-[#0a1833]';
  const darkText = 'text-white';
  const lightBg = 'bg-gradient-to-r from-[#f8fafc] to-[#e0e7ff]';
  const lightText = 'text-gray-700';
  const mainBg = darkMode ? darkBg : lightBg;
  const mainText = darkMode ? darkText : lightText;

  return (
    <div className={darkMode ? 'bg-[#0a1833] min-h-screen transition-colors duration-500' : 'bg-white min-h-screen transition-colors duration-500'}>
      {/* Pass darkMode and setDarkMode to Navbar for toggle rendering */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      {/* Animated AI-generated JobFinder image and icons */}
      <div className={`flex flex-col items-center justify-center py-8 ${mainBg} transition-colors duration-500`}>
        <motion.img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
          alt="AI JobFinder Company Office"
          className="rounded-2xl shadow-xl w-64 h-40 object-cover mb-6 border-4 border-white"
          initial={false}
          animate={false}
        />
        {/* Animated world-class description for JobFinder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className={`text-center max-w-xl mb-6 ${darkMode ? 'text-white' : 'text-[#0a1833]'} text-[1.15rem] md:text-xl leading-snug tracking-tight font-sans`}
        >
          <span className="block" style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}>Empowering your career journey with precision and passion.</span>
          <span className="block mt-1" style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}>Discover opportunities and connect with top companies only on <span className="inline font-semibold" style={{letterSpacing: '0.04em'}}>JOBFINDER</span>.</span>
          <span className="block mt-1" style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}>Your future starts here.</span>
        </motion.div>
        <div className="flex gap-8 mt-2" data-aos="fade-up">
          {[FaSearch, FaUserTie, FaBuilding, FaRocket].map((Icon, idx) => (
            <animated.div
              key={idx}
              ref={el => iconsRef.current[idx] = el}
              style={iconSpring}
              className={`flex flex-col items-center ${mainText}`}
            >
              <Icon className={`text-4xl mb-1 ${darkMode ? 'text-[#3b82f6]' : idx % 2 === 0 ? 'text-[#6A38C2]' : 'text-[#F83002]'} animate-bounce`} />
              <span className="text-xs font-semibold">{['Find Jobs', 'Job Seekers', 'Companies', 'Get Hired'][idx]}</span>
            </animated.div>
          ))}
        </div>
      </div>
      <div ref={heroRef}>
        <HeroSection darkMode={darkMode} />
      </div>
      <div ref={catRef}>
        <CategoryCarousel darkMode={darkMode} />
      </div>
      <div ref={jobsRef}>
        <LatestJobs darkMode={darkMode} />
      </div>
      <Footer darkMode={darkMode} />
    </div>
  )
}

export default Home