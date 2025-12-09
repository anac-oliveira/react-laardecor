import { formatosService } from '../../services/formatosService';
import type { CardProdutoProps } from '../../Types/CardProdutosProps';
import './CardProduto.css';
import decoracao_default from "../../assets/img/Pagina-quarto/sofa-icone.jpg"

export default function CardProduto({ descricao, preco, imagem, id, }: CardProdutoProps) {
    return (

        <div key={id} className="card-produto">
            <img src={(imagem.length > 0) ? `http://localhost:3000/static/${imagem}` : decoracao_default} alt={"Imagem do Produto: " + descricao} />
            <p>{(descricao.length > 0) ? descricao : "Descrição não informada"}</p>
            <div>
                <span className='valor'> {formatosService.PrecoBR(preco)} </span>
                <br />
            </div>
        </div>
    )
}
 