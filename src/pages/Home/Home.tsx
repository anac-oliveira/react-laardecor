import { Link } from 'react-router-dom'
import './Home.css'
import banner from "../../assets/img/sala inicio (2).png";
import banner2 from "../../assets/img/banheiro-ft.png";
import banner3 from "../../assets/img/Quarto Infantil Ft.png";
import quarto from "../../assets/img/tentativa/Quarto (1).png";
import quartoinf from "../../assets/img/tentativa/Group 4.png";
import banheiro from "../../assets/img/tentativa/Banheiro (1).png";
import cozinha from "../../assets/img/tentativa/Cozinha (1).png";
import sala from "../../assets/img/tentativa/Sala de estar.png";
import area from "../../assets/img/tentativa/Área Externa.png";
import escrit from "../../assets/img/tentativa/Escritório.png";




export default function Home() {
  return (
    <>
      <main>
        <section className="banner">
          <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={banner} className="d-block w-100" alt="..." />
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
          <section className="cards">

            <div className="linha1">
              <div className="quarto">
                <img src={quarto} alt="" />
              </div>
              <div className="quarto-inf">
                <img src={quartoinf} alt="" />

              </div>
            </div>

            <div className="linha2">
              <div className="banheiro">
                <img src={banheiro} alt="" />

              </div>
              <div className="cozinha">
                <img src= {cozinha} alt="" />
              </div>
              <div className="sala">
                <img src={sala} alt="" />

              </div>

            </div>

            <div className="linha3">
              <div className="area">
                <img src={area} alt="" />

              </div>
              <div className="escrit">
                <img src={escrit}alt="" />

              </div>

            </div>


          </section>

        </section>
        <Link to={"https://wa.me/5511940028922?text=Olá%21%20Gostaria%20de%20saber%20mais%20sobre%20o%20produto"} className="whatsapp" >  
          <img src="../assets/img/what.png" alt="icone do whatsapp" />
        </Link >
      </main>
      <footer className="rodape fixo">
        <div className="envelope">
          <svg viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M46.98 40.7677C48.8151 42.0183 51.2348 42.0183 53.07 40.7677L82.5956 20.7849C82.1198 16.4349 78.4359 13.05 73.95 13.05H26.1C21.614 13.05 17.9301 16.4349 17.4543 20.7849L46.98 40.7677ZM56.7267 46.178C52.6758 48.924 47.3742 48.924 43.3233 46.178L17.4 28.6285V52.2C17.4 56.9986 21.3014 60.9 26.1 60.9H73.95C78.7486 60.9 82.65 56.9986 82.65 52.2V28.6285L56.7267 46.1644V46.178ZM10.875 29.3625C10.875 27.5546 9.42044 26.1 7.61248 26.1C5.80451 26.1 4.34998 27.5546 4.34998 29.3625V65.25C4.34998 70.0486 8.25138 73.95 13.05 73.95H66.3375C68.1454 73.95 69.6 72.4955 69.6 70.6875C69.6 68.8796 68.1454 67.425 66.3375 67.425H13.05C11.8537 67.425 10.875 66.4463 10.875 65.25V29.3625Z"
              fill="#FACC14" />
          </svg>
        </div>

        <p>laardecor@gmail.com.br</p>
      </footer>
    </>
  )
}
