import React from 'react'
import Footer from './components/Footer'
import FormGenerator from './components/FormGenerator'
import Header from './components/Header'
import Hero from './components/Hero'

const App = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <FormGenerator/>
      <Footer/>
    </div>
  )
}

export default App