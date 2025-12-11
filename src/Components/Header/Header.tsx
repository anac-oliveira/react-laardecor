import { Nav, Navbar } from 'react-bootstrap';
import './Header.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
            <Navbar expand="lg" className=" container-header">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto conteudo-nav">
                        {/*1/3*/}
                        <Nav.Item>
                            <Link to={"/"} title='Ir para página inicial'>
                                <svg className="icone-home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" />
                                </svg>
                            </Link>
                        </Nav.Item>
                        {/*2/3*/}
                        <NavItem className="box-busca" id="box-busca">
                            <svg className="icone-lupa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path
                                    d="M432 272C432 183.6 360.4 112 272 112C183.6 112 112 183.6 112 272C112 360.4 183.6 432 272 432C360.4 432 432 360.4 432 272zM401.1 435.1C365.7 463.2 320.8 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272C480 320.8 463.2 365.7 435.1 401.1L569 535C578.4 544.4 578.4 559.6 569 568.9C559.6 578.2 544.4 578.3 535.1 568.9L401.1 435.1z" />
                            </svg>
                            <input className="campo-busca"
                                type="text"
                                value={pesquisa}
                                onChange={p => setPesquisa(p.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder='Busque por Produtos'
                            />
                        </NavItem>
                        {/*3/3*/}
                        <Nav.Item>
                            <Link to={"/produtos/cadastro"} title='Cadastrar Produtos' >
                                <img className="icone-logo" src={logo} alt="" />
                                </Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>
        </header>

    )
}
