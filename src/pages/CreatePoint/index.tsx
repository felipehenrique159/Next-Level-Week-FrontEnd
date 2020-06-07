import React ,{useEffect}from 'react'
import './style.css'
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi' 
import logo from '../../assets/logo.svg'
import { Map, TileLayer, Marker } from 'react-leaflet'
import api from '../../services/api'


const CreatePoint = () =>{
    useEffect(() =>{
        api.get('items').then(res =>{
            console.log(res);
        })
    },[])
    return(
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to="/">
                 <FiArrowLeft/>   Voltar para home
                </Link>

            </header>

         <form action="">
             <h1>Cadastro do <br/> ponto de coleta</h1>
             <fieldset>
                 <legend>
                     <h2>Dados</h2>
                 </legend>

        <div className="field">
            <label htmlFor="">Nome da entidade</label>
            <input type="text"
                name="name"
                id="name"
            />
        </div>

        <div className="field-group">
        
        <div className="field">
            <label htmlFor="email">E-mail</label>
            <input type="email"
                name="email"
                id="email"
            />
        </div>
        <div className="field">
            <label htmlFor="whatsapp">Whatsapp</label>
            <input type="text"
                name="whatsapp"
                id="whatsapp"
            />
        </div>
        </div>

             </fieldset>
             <fieldset>
                 <legend>
                     <h2>Endereço</h2>
                     <span>Selecione o endereço no mapa</span>
                 </legend>

                 <Map center={[-19.8520046,-43.9150582]} zoom={15}>
                     <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

               <Marker position={[-19.8520046,-43.9150582]}/>

                 </Map>

            <div className="field-group">
                <div className="field">
                    <label htmlFor="uf">Estado (UF)</label>
                    <select name="uf" id="uf">
                        <option value="0">Selecione uma uf</option>
                    </select>
                    
                </div>

                <div className="field">
                    <label htmlFor="city">Cidade</label>
                    <select name="city" id="city">
                        <option value="0">Selecione uma cidade</option>
                    </select>
                    
                </div>
            </div>


             </fieldset>
             <fieldset>
                 <legend>
                     <h2>Itens de coleta</h2>
                     <span>Selecione um ou mais itens abaixo</span>
                 </legend>

        <ul className="items-grid">
            <li>
                <img src="http://localhost:3000/uploads/oleo.svg" alt=""/>
                <span>Óleo de cozinha</span>
            </li>
            <li>
                <img src="http://localhost:3000/uploads/oleo.svg" alt=""/>
                <span>Óleo de cozinha</span>
            </li>
            <li className="selected">
                <img src="http://localhost:3000/uploads/oleo.svg" alt=""/>
                <span>Óleo de cozinha</span>
            </li>
            <li>
                <img src="http://localhost:3000/uploads/oleo.svg" alt=""/>
                <span>Óleo de cozinha</span>
            </li>
            <li>
                <img src="http://localhost:3000/uploads/oleo.svg" alt=""/>
                <span>Óleo de cozinha</span>
            </li>
            <li>
                <img src="http://localhost:3000/uploads/oleo.svg" alt=""/>
                <span>Óleo de cozinha</span>
            </li>
        </ul>

             </fieldset>

             <button type="submit">
                 Cadastrar ponto de coleta
             </button>
         </form>

        </div>
    )
}

export default CreatePoint