import React, { useEffect, useState } from "react";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-md bg-black p-4 text-white shadow-lg">
      {message}
    </div>
  );
};

export default Notification;
