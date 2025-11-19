import whatszapp from '../../assets/img/whats.png';
import './Produtos.css';
import { useEffect, useState } from 'react';
import type { Decoracao } from '../../Types/Decoracao';
import { getDecoracao } from '../../services/decoracaoService';
import CardProduto from '../../Components/CardProduto/CardProduto';
import Carrosel from '../../Components/Carrosel/Carrosel';
import Header from '../../Components/Header/Header';

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
        <>
            <Header />
            <main>
                <Carrosel />

                <section className="container">
                    <h1 className="acessivel">produtos do quarto</h1>
                    <div className="titulo">
                        <span>Quarto</span>
                        <hr />
                    </div>

                    <div className="cards-produto">
                        {
                            decoracao.map((d: Decoracao) => (
                                <CardProduto
                                    key={d.id}
                                    descricao={d.descricao}
                                    preco={d.preco}
                                    imagem={d.imagens[0] ?? ""}
                                />

                            ))
                        }


                    </div>
                </section>

                <a className="whatsapp" href="https://wa.me/5511999998888?text=Olá%20quero%20saber%20mais!" target="_blank" >
                    <img src={whatszapp} alt="" />

                </a>

            </main >
        </>
    )
}
