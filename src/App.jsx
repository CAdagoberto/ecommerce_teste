
import './App.css'
import Home from './pages/home'
import {  Routes, Route, Link} from 'react-router-dom'
import Produtos from './pages/produtos'
import Produto from './pages/produto'
import Navbar from './components/navbar'
import Footer from './components/footer'

function App() {


  return (
    <>
      <Navbar />
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produto/:id" element={<Produto />} />
      </Routes>
      
      <Footer />
    </>
  )
}

export default App
