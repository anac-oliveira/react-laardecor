import { Link } from 'react-router-dom'
import './Home.css'
import banner1 from "../../assets/banner 1.png";
import banner2 from "../../assets/banner 2.png";
import banner3 from "../../assets/banner 3.png";
import whatszapp from "../../assets/img/what.png"
import CardCategoria from '../../Components/CardCategoria/CardCategoria';
import type { CardCategoriaProps } from '../../types/CardCategoriaProps';
import { categorias } from '../../data/categorias';


export default function Home() {
  return (
    <>
      <main >
        <section className="banner">
          <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={banner1} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={banner2} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={banner3} className="d-block w-100" alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>



        <section className="container">
          <section className="cards-categoria">
            { 
              categorias.map((c: CardCategoriaProps) => (
                <CardCategoria
                key={c.classeCss}
                rota={c.rota}
                classeCss={c.classeCss}
                imgCategoria={c.imgCategoria}
                />
              ) )
            }
          </section>



        </section>

        <Link to={"https://wa.me/5511940028922?text=Olá%21%20Gostaria%20de%20saber%20mais%20sobre%20o%20produto"} className="whatsapp" >
          <img src={whatszapp} alt="icone do whatsapp" />
        </Link >

      </main >


     
    </>
  )
}
