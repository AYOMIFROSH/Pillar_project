// LoadingProgress.tsx
import { Progress } from 'antd';
import { useState, useEffect } from 'react';
import { useCsvContext } from '../context/CsvContext';

const LoadingProgress = () => {
  const { loading } = useCsvContext();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setPercent(0);
      interval = setInterval(() => {
        setPercent(prev => (prev >= 90 ? prev : prev + 10));
      }, 200);
    } else {
      setPercent(100);
      const timeout = setTimeout(() => {
        setPercent(0);
      }, 300);
      return () => clearTimeout(timeout);
    }
    return () => clearInterval(interval);
  }, [loading]);

  return (loading || percent > 0) ? (
    <Progress percent={percent} status="active" showInfo={false} strokeColor="#404e5c"  />
  ) : null;
};

export default LoadingProgress;
