import { useEffect, useState, type ChangeEvent } from 'react'
import Header from '../../Components/Header/Header'
import './Cadastro.css'
import type { Decoracao } from '../../Types/Decoracao'
import { deleteDecoracao, enviarFotoParaAPI, getDecoracao, postDecoracao } from '../../services/decoracaoService';
import Footer from '../../Components/Footer/Footer';
import ModalCustomizado from '../../Components/ModalCustomizado/ModalCustomizado';
import { NumericFormat } from 'react-number-format';
import { formatosService } from '../../services/formatosService';


export default function Cadastro() {

    const [decoracao, setDecoracao] = useState<Decoracao[]>([]);
    const [clicouNaLixeira, setClicouNaLixeira] = useState<boolean>(false);
    const [idParaDeletar, setIdParaDeletar] = useState<string>("");
    const [aposConfirmacaoDeBoloRemovido, setAposConfirmacaoDeDecoracaoRemovida] = useState<boolean>(false);
    const [propsModalDeErroOuSucesso, setPropsModalDeErroOuSucesso] = useState<{ exibir: boolean, titulo: string, corpo: string }>({ exibir: false, titulo: "", corpo: "" });
    const [nomeDecoracao, setNomeDecoracao] = useState<string>("");
    const [categorias, setCategorias] = useState<string>("");
    const [imagem, setImagem] = useState<File | undefined>(undefined);
    const [preco, setPreco] = useState<number | undefined>(undefined);
    const [descricao, setDescricao] = useState<string>("");
    const [bgImageInputColor, setBgImageInputColor] = useState<string>("#ffffff");

    const abrirModalParaConfirmarDelete = (id: string) => {
        setClicouNaLixeira(true);
        setIdParaDeletar(id);
    }

    const fecharModalConfirmacaoDelete = () => {
        setClicouNaLixeira(false);
    }

    const fecharModalDeErroOuSucesso = () => {
        setPropsModalDeErroOuSucesso({ ...propsModalDeErroOuSucesso, exibir: false }); // ...spread operator
    }

    const exibirModalDeErroOuSucesso = (titulo: string, corpo: string) => {
        setPropsModalDeErroOuSucesso({ exibir: true, titulo, corpo });
    }

    const removerItemAposConfirmacao = async (id: string) => {
        try {
            await deleteDecoracao(id);
            setAposConfirmacaoDeDecoracaoRemovida(true);
            await fetchDecoracao();
            fecharModalConfirmacaoDelete();
        } catch (error) {
            exibirModalDeErroOuSucesso("Erro", "Erro ao deletar o Decoração");
        }
    }

    const fetchDecoracao = async () => {
        try {
            const dados = await getDecoracao();
            console.log(dados);
            setDecoracao(dados);
        } catch (error) {
            console.error("Erro ao executar getDecoracao: ", error);
        }
    }

    const carregarImagem = (img: ChangeEvent<HTMLInputElement>) => {
        const file = img.target.files?.[0];
        if (file?.type.includes("image")) {
            setImagem(file);
            setBgImageInputColor("#5cb85c");
        }
        else {
            setImagem(undefined);
            setBgImageInputColor("#ff2c2c");
        }
    }

    const limparDados = () => {
        setNomeDecoracao("");
        setCategorias("");
        setImagem(undefined);
        setPreco(undefined);
        setDescricao("");
        setBgImageInputColor("#ffffff");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nomeDecoracao || !categorias || !preco) {
            exibirModalDeErroOuSucesso("Campos obrigatórios", "Preencha o nome, categorias e preço do Decoracao");
            return;
        }

        let uploadedFileName: string | undefined;

        if (imagem) {
            uploadedFileName = await enviarFotoParaAPI(imagem);
            if (!uploadedFileName) {
                exibirModalDeErroOuSucesso("Erro", "Cadastro cancelado por falha no upload da imagem.");
                return;
            }
        }

        const novoDecoracao: Decoracao = {
            id: undefined,
            nome: nomeDecoracao,
            descricao: descricao,
            preco: preco,
            categorias: categorias.toLowerCase().split(",").map(c => c.trim()),
            imagens: uploadedFileName ? [uploadedFileName] : []
        }

        try {
            await postDecoracao(novoDecoracao);
            exibirModalDeErroOuSucesso("Sucesso", "Nova Decoração cadastrado com sucesso!");
            fetchDecoracao();
            limparDados();
        } catch (error) {
            exibirModalDeErroOuSucesso("Erro", "Erro ao cadastrar nova Decoração");
        }

    }

    useEffect(() => {
        fetchDecoracao();
    }, [])



    return (
        <>
            <Header />
            <main>
                <h1 className="acessivel">Cadastro</h1>
                <form onSubmit={handleSubmit} className="container-cadastro">
                    <h2>Cadastro de Produtos</h2>
                    <hr />

                    <div className="box-cadastro">
                        <div className="cadastro-coluna1">
                            <div className="produto">
                                <label htmlFor="produto">Produto</label>
                                <input
                                    type="text"
                                    id="Produto"
                                    placeholder='Insira o nome da Decoração'
                                    value={nomeDecoracao}
                                    onChange={e => setNomeDecoracao(e.target.value)} />
                            </div>

                            <div className="categoria-img">
                                <div className="categoria">
                                    <label htmlFor="cat">Categoria</label>
                                    <input
                                        type="text"
                                        id="cat"
                                        placeholder='Quarto, Banheiro, Sala...'
                                        value={categorias}
                                        onChange={c => setCategorias(c.target.value)} />
                                </div>
                                <div className="img">
                                    <label htmlFor="img">
                                        <span>Imagem</span>
                                        <div>
                                            <svg width="61" height="61" viewBox="0 0 61 61" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M15.25 8.84495C12.7242 8.84495 10.675 10.8942 10.675 13.4199V37.8199C10.675 40.3457 12.7242 42.3949 15.25 42.3949H45.75C48.2758 42.3949 50.325 40.3457 50.325 37.8199V13.4199C50.325 10.8942 48.2758 8.84495 45.75 8.84495H15.25ZM9.15 13.4199C9.15 10.0554 11.8855 7.31995 15.25 7.31995H45.75C49.1145 7.31995 51.85 10.0554 51.85 13.4199V37.8199C51.85 41.1845 49.1145 43.9199 45.75 43.9199H15.25C11.8855 43.9199 9.15 41.1845 9.15 37.8199V13.4199ZM1.525 17.2324V47.7324C1.525 49.8389 3.23109 51.5449 5.3375 51.5449H41.9375C42.3569 51.5449 42.7 51.8881 42.7 52.3074C42.7 52.7268 42.3569 53.0699 41.9375 53.0699H5.3375C2.39234 53.0699 0 50.6776 0 47.7324V17.2324C0 16.8131 0.343125 16.4699 0.7625 16.4699C1.18187 16.4699 1.525 16.8131 1.525 17.2324ZM35.1417 21.0449C34.6366 21.0259 34.16 21.2546 33.855 21.6549L29.1656 27.9074C29.0417 28.0695 28.8606 28.1743 28.6605 28.2029C28.4603 28.2315 28.2506 28.1743 28.0886 28.0504L25.3341 25.9249C24.6764 25.4198 23.7328 25.5342 23.2181 26.1823L17.1181 33.8073C16.7559 34.2648 16.6797 34.8939 16.937 35.4181C17.1944 35.9423 17.7281 36.2854 18.3095 36.2854H42.7095C43.2623 36.2854 43.777 35.9804 44.0439 35.5039C44.3108 35.0273 44.3013 34.4268 44.0058 33.9598L36.3808 21.7598C36.1139 21.3309 35.6564 21.064 35.1512 21.0449H35.1417ZM32.635 20.7399C33.2355 19.9393 34.1981 19.4818 35.2084 19.5199C36.2188 19.5581 37.1338 20.1014 37.6675 20.9496L45.2925 33.1496C45.8834 34.0932 45.912 35.2751 45.3783 36.2473C44.8445 37.2195 43.8056 37.8199 42.7 37.8199H18.3C17.1277 37.8199 16.0602 37.1528 15.555 36.0948C15.0498 35.0368 15.1928 33.7882 15.9267 32.8637L22.0267 25.2387C23.0656 23.9424 24.9528 23.7137 26.2681 24.724L28.4031 26.3824L32.635 20.7399ZM21.6073 17.2324C21.6645 16.2889 21.1975 15.3929 20.3873 14.8973C19.5772 14.4112 18.5573 14.4112 17.7472 14.8973C16.937 15.3929 16.47 16.2889 16.5272 17.2324C16.47 18.176 16.937 19.072 17.7472 19.5676C18.5573 20.0537 19.5772 20.0537 20.3873 19.5676C21.1975 19.072 21.6645 18.176 21.6073 17.2324ZM15.25 17.2324C15.25 15.126 16.9561 13.4199 19.0625 13.4199C21.1689 13.4199 22.875 15.126 22.875 17.2324C22.875 19.3389 21.1689 21.0449 19.0625 21.0449C16.9561 21.0449 15.25 19.3389 15.25 17.2324Z"
                                                    fill="#2A3A01" />
                                            </svg>

                                        </div>
                                    </label>
                                    <input
                                        type="file"
                                        id="img"
                                        accept='image/*'
                                        onChange={carregarImagem} />
                                </div>
                                <div className="valor_peso">
                                    <div className="valor">
                                        <label htmlFor="val">Valor</label>
                                        <NumericFormat
                                            id='val'
                                            placeholder='Insira o preço (R$)'
                                            value={preco ?? ""}
                                            thousandSeparator="."
                                            decimalSeparator=','
                                            prefix='R$ '
                                            decimalScale={2}
                                            fixedDecimalScale
                                            allowNegative={false}
                                            onValueChange={(values) => {
                                                setPreco(values.floatValue ?? undefined);
                                            }}
                                            inputMode='decimal'
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="cadastro-coluna2">
                            <label htmlFor="desc">Descrição</label>
                            <textarea
                                id="desc"
                                maxLength={200}
                                placeholder='Escreva detalhes sobre a Decoração'
                                value={descricao}
                                onChange={d => setDescricao(d.target.value)}
                            >
                            </textarea>
                        </div>
                    </div>
                    <button className='botaoSubmit' type='submit'>Cadastrar</button>
                </form>

                <section className="container-lista">

                    <h2>Lista</h2>
                    <hr />


                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Categoria</th>
                            <th>Descrição</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            decoracao.map((d: Decoracao) => (
                                <tr key={d.id}>
                                    <td data-cell="Produto: ">{d.nome} </td>
                                    <td data-cell="Categoria: ">{d.categorias.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(", ")} </td>
                                    <td data-cell="Descrição: ">{d.descricao || "Não informado"}
                                        <td data-cell="Valor: "> {formatosService.PrecoBR(d.preco)} </td>
                                    </td>

                                    <td>
                                        <svg viewBox="0 0 127 127" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M46.1762 13.8707C47.0493 11.2712 49.4703 9.5249 52.2087 9.5249H74.8107C77.5492 9.5249 79.9701 11.2712 80.8432 13.8707L82.5498 19.0499H101.6C105.112 19.0499 107.95 21.8876 107.95 25.3999C107.95 28.9122 105.112 31.7499 101.6 31.7499H25.3998C21.8875 31.7499 19.0498 28.9122 19.0498 25.3999C19.0498 21.8876 21.8875 19.0499 25.3998 19.0499H44.4498L46.1762 13.8707ZM25.3998 41.2749H101.6V101.6C101.6 108.605 95.9046 114.3 88.8998 114.3H38.0998C31.095 114.3 25.3998 108.605 25.3998 101.6V41.2749ZM42.8623 53.9749C40.2231 53.9749 38.0998 56.0982 38.0998 58.7374V96.8374C38.0998 99.4766 40.2231 101.6 42.8623 101.6C45.5015 101.6 47.6248 99.4766 47.6248 96.8374V58.7374C47.6248 56.0982 45.5015 53.9749 42.8623 53.9749ZM63.4998 53.9749C60.8606 53.9749 58.7373 56.0982 58.7373 58.7374V96.8374C58.7373 99.4766 60.8606 101.6 63.4998 101.6C66.139 101.6 68.2623 99.4766 68.2623 96.8374V58.7374C68.2623 56.0982 66.139 53.9749 63.4998 53.9749ZM84.1373 53.9749C81.4981 53.9749 79.3748 56.0982 79.3748 58.7374V96.8374C79.3748 99.4766 81.4981 101.6 84.1373 101.6C86.7765 101.6 88.8998 99.4766 88.8998 96.8374V58.7374C88.8998 56.0982 86.7765 53.9749 84.1373 53.9749Z"
                                                fill="#623820" />
                                        </svg>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </section>
            </main >
            <Footer />
            <ModalCustomizado
                mostrarModalQuando={clicouNaLixeira}
                aoCancelar={fecharModalConfirmacaoDelete}
                titulo='Confirmar exclusão'
                corpo='Tem certeza que deseja remover este item?'
                customizarBotoes={true}
                textoBotaoConfirmacao='Excluir'
                textoBotaoCancelamento='Cancelar'
                aoConfirmar={() => removerItemAposConfirmacao(idParaDeletar)}
                exibirConteudoCentralizado={true}
            />
            <ModalCustomizado
                mostrarModalQuando={aposConfirmacaoDeBoloRemovido}
                aoCancelar={() => setAposConfirmacaoDeDecoracaoRemovida(false)}
                titulo='Sucesso'
                corpo='Decoração removida!'
            />
            <ModalCustomizado
                mostrarModalQuando={propsModalDeErroOuSucesso.exibir}
                aoCancelar={fecharModalDeErroOuSucesso}
                titulo={propsModalDeErroOuSucesso.titulo}
                corpo={propsModalDeErroOuSucesso.corpo}
                exibirConteudoCentralizado={true}
            />
        </>

    )
}