import  { useState, useEffect } from 'react';

const DeviceCheck = ({ children, fallback }: any) => {
    const [isLargeScreen, setIsLargeScreen] = useState(true);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 1024); // Adjust this value as needed
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return isLargeScreen ? children : fallback;
};

export default DeviceCheck;