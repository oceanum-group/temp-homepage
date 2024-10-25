import React, { useEffect, useRef, useState } from 'react';
import '../src/Animation.css'; // Import the CSS file for animations

const Animation: React.FC = () => {
    const lightRef = useRef<HTMLDivElement>(null);

    // Use state to track time for sine calculations
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prev) => prev + 0.05); // Increment time
        }, 16); // ~60fps (1000ms/60)

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (lightRef.current) {
            // Define amplitude and frequency for the sine waves
            const amplitude = 150; // Amplitude for movement
            const frequencyX = 0.5; // Frequency for X-axis
            const frequencyY = 0.8; // Frequency for Y-axis
            const frequencyZ = 0.3; // Frequency for Z-axis

            // Calculate X, Y, and Z positions using sine functions
            const x = amplitude * Math.sin(time * frequencyX) + window.innerWidth / 2; // Center horizontally
            const y = amplitude * Math.sin(time * frequencyY) + window.innerHeight / 2; // Center vertically
            const scale = 0.8 + 0.2 * Math.sin(time * frequencyZ); // Scale variation

            // Apply transformation
            lightRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        }
    }, [time]); // Recalculate on time change

    return (
        <div className="animation-container">
            <div className="feather-light" ref={lightRef}></div>
        </div>
    );
};

export default Animation;
