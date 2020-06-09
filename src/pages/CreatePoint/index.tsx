import React ,{useEffect, useState, ChangeEvent}from 'react'
import './style.css'
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi' 
import logo from '../../assets/logo.svg'
import { Map, TileLayer, Marker } from 'react-leaflet'
import api from '../../services/api'
import axios from 'axios'

interface Item{
    id: number,
    title:string,
    image_url: string
}

interface Uf_response{
    sigla:string
}
interface city_response{
    nome:string
}

const CreatePoint = () =>{

    //array ou objeto informar tipo da variavel

    const [items, setItems] = useState<Item[]>([]); //o estado chama items, setItems é nome da função
                                                    //começa o estado com array vazio
    const [ufs,setUfs] = useState<string[]>([])

    const [selectedUf, setSelectUf] = useState('0')
    
    const [cities, setCities] = useState<string[]>([])
    
    const [selectedCity, setSelectCity] = useState('0')
    
    useEffect(() =>{
        api.get('items').then(res =>{
            setItems(res.data);
        })
    },[])

    useEffect(() =>{
        axios.get<Uf_response[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res=>{
          const iniciaisUF = res.data.map(uf => uf.sigla)
        setUfs(iniciaisUF)
        })
    })

    useEffect(()=>{  //carregar cidades ao selecionar uf
        if(selectedUf === '0'){
            return;
        }
        else{
      
         axios.get<city_response[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(res=>{
       const cityNames = res.data.map(city => city.nome)
            setCities(cityNames)
        })
    
    }
    },[selectedUf]) 

    function handleSelectUF(event: ChangeEvent<HTMLSelectElement>){
      const uf = event.target.value
      setSelectUf(uf)
    }
    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){
      const city = event.target.value
      setSelectCity(city)
    }

    
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
                    <select onChange={handleSelectUF} value={selectedUf} name="uf" id="uf">
                        <option value="0">Selecione uma uf</option>
                        {ufs.map(uf => (
                            <option key={uf} value={uf}>{uf}</option>
                        ))}
                    </select>
                    
                </div>

                <div className="field">
                    <label htmlFor="city">Cidade</label>
                    <select onChange={handleSelectCity} value={selectedCity} name="city" id="city">
                        <option value="0">Selecione uma cidade</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                            
                        ))}

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
            {items.map(item =>(
            <li key={item.id}>
            <img src={item.image_url} alt=""/>
            <span>{item.title}</span>
</li>
            ))}
           
            
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