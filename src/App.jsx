
import './App.css'
import Home from './pages/home'
import { Routes, Route } from 'react-router-dom'
import Produtos from './pages/produtos'
import Produto from './pages/produto'
import Carrinho from './pages/carrinho'
import Navbar from './components/navbar'
import Footer from './components/footer'

const App = () => (
    <>
        <Navbar />

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/produto/:id" element={<Produto />} />
            <Route path="/carrinho" element={<Carrinho />} />
        </Routes>

        <Footer />
    </>
)

export default App
