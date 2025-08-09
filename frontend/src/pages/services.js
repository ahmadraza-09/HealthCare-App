import React from 'react'
import Header from '../components/header';
import Footer from '../components/footer';
import ServicesSection from '../components/services-section';

const Services = () => {
    return (
        <div>
            {<Header />}
            {<ServicesSection />}
            {<Footer />}
        </div>
    )
}

export default Services
