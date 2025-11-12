import banner1 from '../../assets/img/Quarto2 1.png';
import banner2 from '../../assets/img/Pagina-quarto/Banner 2.png';
import banner3 from '../../assets/img/Pagina-quarto/banner 3 (1).png';
import whatszapp from '../../assets/img/whats.png';
import './Produtos.css';
import { useEffect, useState } from 'react';
import type { Decoracao } from '../../type/decoracao';
import { getDecoracao } from '../../services/decoracaoService';


export default function Produtos() {

    const [decoracao, setDecoracao] = useState<Decoracao[]>([]);

    const fetchDecoracao = async () => {
        try {
            const dados = await getDecoracao();
            console.log("Lista de Decoração vinda da API: ", dados);
            setDecoracao(dados);
        } catch (error) {
            console.error("Erro ao executar getDecoracao: ", error);
        }
    }
    useEffect(() => {
        fetchDecoracao();
    }, [])

    return (
        <main>
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" >
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
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <section className="container">
                <h1 className="acessivel">produtos do quarto</h1>
                <div className="titulo">
                    <span>Quarto</span>
                    <hr />
                </div>

                <div className="cards-produto">
                    {
                        decoracao.map((d: Decoracao) => (
                            <div className='card-produto'>
                                <img src={`http://localhost:3000/static/${d.imagens[0]}`} alt={"Imagem do Produto: " + d.descricao} />
                                <p className="descrição">{d.descricao}</p>
                                <span className="valor">{d.preco}</span>
                            </div>

                        ))
                    }


                </div>
            </section>

            <a className="whatsapp" href="https://wa.me/5511999998888?text=Olá%20quero%20saber%20mais!" target="_blank" >
                <img src={whatszapp} alt="" />

            </a>

        </main >
    )
}
