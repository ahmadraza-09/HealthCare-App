import React from 'react'
import Header from '../components/header';
import Footer from '../components/footer';
import ContactComp from '../components/contactcomp';

const Contact = () => {
  return (
    <div>
      {<Header/>}
      {<ContactComp/>}
      {<Footer/>}
    </div>
  )
}

export default Contact
