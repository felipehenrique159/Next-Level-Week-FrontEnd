import React from 'react';

interface HeaderProps{
    title: string;
}

const Header: React.FC<HeaderProps>= (props) =>{  //usando const para usar atributos no componente
    return(
        <header>
            <h1>{props.title}</h1>
        </header>
    )
}

export default Header;