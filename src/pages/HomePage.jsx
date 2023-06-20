import React from 'react';
import Header from '../components/Header';
import TypingBox from '../components/TypingBox';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div className="canvas">
            <Header />
            <TypingBox />
            <Footer />
        </div>
    )
}

export default HomePage;
