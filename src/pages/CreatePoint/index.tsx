import React ,{useEffect, useState, ChangeEvent, FormEvent}from 'react'
import './style.css'
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi' 
import logo from '../../assets/logo.svg'
import { Map, TileLayer, Marker } from 'react-leaflet'
import {LeafletMouseEvent, latLng} from 'leaflet'
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
    
    const [selectedPosition, setSelectedPosition] = useState<[number,number]>([0,0])
    
    const [initialPosition, setInitialPosition] = useState<[number,number]>([0,0])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    })


    const [selectedItems, setSelectedItems] = useState<number[]>([])
  
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
    
    useEffect(()=>{  //carregar cidades ao selecionar uf
      
        navigator.geolocation.getCurrentPosition(position =>{  //retornar a posição do usuario
            const {latitude , longitude} = position.coords;

            setInitialPosition([latitude,longitude]);
        })
    
    
    },[]) 

    function handleSelectUF(event: ChangeEvent<HTMLSelectElement>){
      const uf = event.target.value
      setSelectUf(uf)
    }
    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){
      const city = event.target.value
      setSelectCity(city)
    }

    function handleMapClick(event: LeafletMouseEvent){
        setSelectedPosition([event.latlng.lat,
            event.latlng.lng])
    }
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name,value} = event.target;
       setFormData({...formData, [name]:value})
    }

    function handleSelectItem(id: number){
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if(alreadySelected >= 0){
            const filteredItems = selectedItems.filter(item=> item !==id);
            setSelectedItems(filteredItems)
        }
        else{
            setSelectedItems([ ...selectedItems, id ])

        }

    }

   async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const {name, email, whatsapp} = formData;
        const uf = selectedUf
        const city = selectedCity
        const [latitude, longitude] = selectedPosition
        const items = selectedItems;

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        }

      await  api.post('points',data)

      alert('Ponto de coleta criado')

    }

    return(
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to="/">
                 <FiArrowLeft/>   Voltar para home
                </Link>

            </header>

         <form onSubmit={handleSubmit} >
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
                onChange={handleInputChange}
            />
        </div>

        <div className="field-group">
        
        <div className="field">
            <label htmlFor="email">E-mail</label>
            <input type="email"
                name="email"
                id="email"
                 onChange={handleInputChange}
            />
        </div>
        <div className="field">
            <label htmlFor="whatsapp">Whatsapp</label>
            <input type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
            />
        </div>
        </div>

             </fieldset>
             <fieldset>
                 <legend>
                     <h2>Endereço</h2>
                     <span>Selecione o endereço no mapa</span>
                 </legend>

                 <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
                     <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

               <Marker position={selectedPosition}/>

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
            <li key={item.id} 
            onClick={() => handleSelectItem(item.id)}
            className={selectedItems.includes(item.id) ? 'selected' : ''}
            >
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