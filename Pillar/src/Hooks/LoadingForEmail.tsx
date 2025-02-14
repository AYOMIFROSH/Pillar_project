import { Progress } from 'antd';
import { useState, useEffect } from 'react';

interface SendingProgressBarProps {
  isSending: boolean;
}

const SendingProgressBar: React.FC<SendingProgressBarProps> = ({ isSending }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSending) {
      setPercent(0);
      interval = setInterval(() => {
        // Increase the progress gradually to a max of 90% until sending is done.
        setPercent(prev => (prev >= 90 ? prev : prev + 10));
      }, 200);
    } else {
      // When sending is finished, quickly move the bar to 100% and then reset.
      setPercent(100);
      const timeout = setTimeout(() => {
        setPercent(0);
      }, 300);
      return () => clearTimeout(timeout);
    }
    return () => clearInterval(interval);
  }, [isSending]);

  return (isSending || percent > 0) ? (
    <Progress percent={percent} status="active" showInfo={false} strokeColor="#404e5c" />
  ) : null;
};

export default SendingProgressBar;
