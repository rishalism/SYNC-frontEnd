import { Button } from '@nextui-org/react';
import React from 'react';
import { Link } from 'react-router-dom';

const SmallScreenMessage = () => (
    <div className="p-6 w-full h-full flex flex-col items-center justify-center text-center bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 animate-fade-in">
            Please use a large screen device for a better experience
        </h2>
        <p className="mt-2 text-gray-600">
            This application is optimized for laptops and desktop computers.
        </p>
        <Button as={Link} to={'/'} color='primary' className='mt-5'>Go back to Home screen</Button>
    </div>

);

export default SmallScreenMessage;