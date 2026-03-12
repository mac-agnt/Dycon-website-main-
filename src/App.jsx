import { useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Brands from './components/Brands'
import Products from './components/Products'
import Footer from './components/Footer'
import ScrollPaintCan from './components/ScrollPaintCan'

export default function App() {
  const scrollProgressRef = useRef(0)

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Brands />
      <Products />
      <Footer />
      <ScrollPaintCan scrollProgressRef={scrollProgressRef} />
    </>
  )
}
