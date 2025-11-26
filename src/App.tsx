import { BrowserRouter, Route, Routes, } from "react-router-dom"
import Produtos from "./pages/Produtos/Produtos"
import Home from "./pages/Home/Home"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Produtos  />} />
        <Route path="/Produtos/pesquisa" element={< Produtos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
