import whatsapp from '../../assets/img/what.png';
import './Produtos.css';
import { useEffect, useState } from 'react';
import type { Decoracao } from '../../Types/Decoracao';
import { getDecoracao } from '../../services/decoracaoService';
import CardProduto from '../../Components/CardProduto/CardProduto';
import Carrosel from '../../Components/Carrosel/Carrosel';
import Header from '../../Components/Header/Header';
import { useLocation } from 'react-router-dom';

export default function Produtos() {

    const [decoracao, setDecoracao] = useState<Decoracao[]>([]);
    const location = useLocation();

    const parametrosPesquisados = new URLSearchParams(location.search);
    const termo_Pesquisado = parametrosPesquisados.get('query');

    const fetchDecoracao = async () => {
        try {
            const dados = await getDecoracao();
            // console.log("Lista de Decoração vinda da API: ", dados);
            if (termo_Pesquisado) {
                const dados_filtrados = dados.filter(d =>
                    d.nome.toLowerCase().includes(termo_Pesquisado.toLowerCase()) ||
                    d.descricao.toLowerCase().includes(termo_Pesquisado.toLowerCase()) ||
                    d.categorias.some(cat => cat.toLowerCase().includes(termo_Pesquisado.toLowerCase()))

                );
            } else
                setDecoracao(dados);
        } catch (error) {
            console.error("Erro ao executar getDecoracao: ", error);
        }
    }
    useEffect(() => {
        fetchDecoracao();
        console.log("Termo pesquisado: ", termo_Pesquisado);

    }, [termo_Pesquisado])

    return (
        <>
            <Header />
            <main>
                <Carrosel />

                <section className="container-laardecor ">
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

                <a className="whatsapp" href="https://wa.me/5511999999999?text=Olá%20quero%20saber%20mais!" target="_blank">
            <img src={whatsapp} alt=""/>

        </a>

            </main >
        </>
    )
}
