"use client"
import { useState, useEffect } from "react";
import { Users, Briefcase, Award, Globe } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  duration: number;
  suffix?: string;
}

const StatItem = ({ icon, value, label, duration, suffix = "" }: StatItemProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(percentage * value));
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);
  
  return (
    <div className="text-center p-6">
      <div className="flex justify-center mb-4">
        <div className="gradient-bg p-4 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent shadow-lg">
          {icon}
        </div>
      </div>
      <div className="text-4xl font-bold mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-600 dark:text-gray-300">{label}</div>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="glass-card rounded-2xl p-8 overflow-hidden relative bg-white/80 dark:bg-slate-800/80 shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full translate-x-1/4 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full -translate-x-1/4 translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            <StatItem 
              icon={<Users className="h-6 w-6 text-white" />} 
              value={200} 
              label="Clients Worldwide" 
              duration={2000} 
              suffix="+"
            />
            <StatItem 
              icon={<Briefcase className="h-6 w-6 text-white" />} 
              value={500} 
              label="Projects Completed" 
              duration={2000} 
              suffix="+"
            />
            <StatItem 
              icon={<Award className="h-6 w-6 text-white" />} 
              value={10} 
              label="Years of Experience" 
              duration={2000} 
              suffix="+"
            />
            <StatItem 
              icon={<Globe className="h-6 w-6 text-white" />} 
              value={15} 
              label="Countries Served" 
              duration={2000} 
              suffix="+"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats; 