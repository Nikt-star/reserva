import { useState, useEffect } from 'react';

export const useTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return currentTime;
};

export const useTimeRemaining = (endTime: Date) => {
  const currentTime = useTime();
  
  const getTimeRemaining = () => {
    const diff = endTime.getTime() - currentTime.getTime();
    if (diff <= 0) return { minutes: 0, seconds: 0, expired: true };
    
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    return { minutes, seconds, expired: false };
  };

  return getTimeRemaining();
};