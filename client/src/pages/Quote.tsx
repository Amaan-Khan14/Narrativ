import { useState, useEffect } from 'react';

const quotes = [
    "Reading blogs is like having a conversation with the world's brightest minds.",
    "Blogs are windows to diverse perspectives and endless knowledge.",
    "In the digital age, blogs are the new libraries of wisdom.",
    "Every blog post read is a step towards expanding your horizons.",
    "Blogs turn the internet into a global classroom, always in session.",
    "Reading blogs regularly is like giving your mind a daily workout.",
    "Through blogs, we connect with ideas that inspire, challenge, and transform.",
    "Blogs are the modern campfire stories, sharing experiences across the globe.",
    "In the blogosphere, every day brings a new opportunity to learn something extraordinary.",
    "Reading blogs: where curiosity meets endless discovery."
];

export const Quote = () => {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
    }, []);

    return (
        <div className="bg-gradient-to-r from-slate-400 to-slate-500 h-screen flex justify-center flex-col m-0">
            <div>
                <h1 className="text-6xl text-center text-white">Quote</h1>
                <p className="text-center text-white">{quote}</p>
            </div>
        </div>
    );
}