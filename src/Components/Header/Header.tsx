import Navbar from 'react-bootstrap/Navbar';
import './Header.css';
import Nav from 'react-bootstrap/esm/Nav';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavItem } from 'react-bootstrap';
import logo from '../../assets/img/laar logo.png';


export default function Header() {
    const [pesquisa, setPesquisa] = useState<string>("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!pesquisa.trim()) return;
        navigate(`/produtos/pequisa?query=${encodeURIComponent(pesquisa)}`);
        setPesquisa("");

    }

    const handleKeyDown = (evento: React.KeyboardEvent<HTMLInputElement>) => {
        if (evento.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <header>
            <Navbar expand="md" className="container-laardecor container-header">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto conteudo-nav">
                        {/*1/3*/}
                        <Nav.Item>
                            <svg className="icone-voltar" viewBox="0 0 111 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.1 23.0375C11.1 21.0217 12.9558 19.4 15.2625 19.4C17.5692 19.4 19.425 21.0217 19.425 23.0375V73.9625C19.425 75.9783 17.5692 77.6 15.2625 77.6C12.9558 77.6 11.1 75.9783 11.1 73.9625V23.0375ZM34.514 51.0766C32.8837 49.6519 32.8837 47.3481 34.514 45.9386L58.1015 25.3109C59.7319 23.8863 62.3681 23.8863 63.9811 25.3109C65.594 26.7356 65.6114 29.0394 63.9811 30.4489L47.5045 44.8473H95.7375C98.0442 44.8473 99.9 46.4691 99.9 48.4848C99.9 50.5006 98.0442 52.1223 95.7375 52.1223H47.5045L63.9811 66.5208C65.6114 67.9455 65.6114 70.2492 63.9811 71.6588C62.3508 73.0683 59.7145 73.0834 58.1015 71.6588L34.514 51.0766Z"
                                    fill="#FACC14" />
                            </svg>
                        </Nav.Item>
                        {/*2/3*/}
                        <NavItem className="box-busca" id="box-busca">
                            <svg className="icone-lupa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path
                                    d="M432 272C432 183.6 360.4 112 272 112C183.6 112 112 183.6 112 272C112 360.4 183.6 432 272 432C360.4 432 432 360.4 432 272zM401.1 435.1C365.7 463.2 320.8 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272C480 320.8 463.2 365.7 435.1 401.1L569 535C578.4 544.4 578.4 559.6 569 568.9C559.6 578.2 544.4 578.3 535.1 568.9L401.1 435.1z" />
                            </svg>
                            <input className="campo-busca" type="text" name="busca" id="" placeholder="Busque por produtos." />
                        </NavItem>
                        {/*3/3*/}
                        <Nav.Item>
                            <img className="icone-logo" src={logo} alt="" />
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>
        </header>

    )
}
