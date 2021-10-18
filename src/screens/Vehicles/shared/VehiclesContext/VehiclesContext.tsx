import axios from 'axios'
import React from 'react'
import { IVehicles, IVehiclesFromApi, IVehiclesToApi } from '../../../../shared/api'

//import { User } from '../../shared/api'
//import { client } from '../../shared/client'

export interface VehiclesContextValue {
  vehicles: IVehicles[],
  vehicleSelected: IVehicles|undefined,
  createVehicle: (vehicleSel:IVehiclesToApi)=>void,
  updateVehicle: (vehicle:IVehiclesToApi,id:number)=>void,
  deleteVehicle: (id:number)=>void,
  selectVehicle: (vehicleSel:IVehicles|undefined)=>void,
  loading: boolean,
  error: boolean,
}

const VehiclesContext = React.createContext<VehiclesContextValue | undefined>(
  undefined,
)

const VehiclesProvider: React.FC = ({ children }) => {
  const [vehicles, setVehicles] = React.useState<IVehicles[]>([])
  const [vehicleSelected, setVehicleSelected]=React.useState<IVehicles|undefined>()
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    async function getVehicles() {
      setLoading(true)
      try {
        axios.get<Array<IVehiclesFromApi> >(`https://quiet-eyrie-82714.herokuapp.com/api/vehicles`)
            .then(res => {
                const getVehicles:Array<IVehiclesFromApi> = res.data;
                //console.log(getVehicles)
                setVehicles( getVehicles.map((element,index)=>{
                    const {id,placa,categoria,usuario,unidad,anho,marca} =element
                    return {id,key:`vehicles-list-item-${id}`,placa,categoria,usuario,unidad,anho,marca}
            }));
        })
        setLoading(false)
      } catch (err: unknown) {
        console.error(err)
        setError(true)
        setLoading(false)
      }
    }
    getVehicles()
  }, [])

  const selectVehicle = (vehicle:IVehicles|undefined) => {
    setVehicleSelected(vehicle);
  }

  const createVehicle = (vehicle:IVehiclesToApi) => {
    axios.post<IVehiclesFromApi>(`https://quiet-eyrie-82714.herokuapp.com/api/vehicles`,vehicle).then(res => {
    const {id,placa,categoria,usuario,unidad,anho,marca} = res.data
    setVehicles([...vehicles,{id,key:`vehicles-list-item-${id}`,placa,categoria,usuario,unidad,anho,marca}])})
    
  }

  const updateVehicle = (vehicle:IVehiclesToApi,id:number) => {
    axios.put<IVehiclesFromApi>(`https://quiet-eyrie-82714.herokuapp.com/api/vehicles/${id}`,vehicle).then(res => {
      setVehicles([...vehicles.filter( (vehicle)=>vehicle.id!==id ),{id,key:`vehicles-list-item-${id}`,...vehicle}])
    })
  }
  const deleteVehicle = (id:number) => {
    setLoading(true)
    try {
      axios.delete(`https://quiet-eyrie-82714.herokuapp.com/api/vehicles/${id}`)
      setLoading(false)
      setVehicles(
        vehicles.filter( (vehicle)=>vehicle.id!==id )
      )
    } catch (err: unknown) {
      console.error(err)
      setError(true)
      setLoading(false)
    }
  }

  return (
    <VehiclesContext.Provider value={{ vehicles, error, loading, vehicleSelected, selectVehicle,createVehicle,updateVehicle,deleteVehicle}}>
      {children}
    </VehiclesContext.Provider>
  )
}

function useVehicles(): VehiclesContextValue {
  const context = React.useContext(VehiclesContext)
  if (typeof context === 'undefined') {
    throw Error("The context isn't defined")
  }
  return context
}

export { VehiclesProvider, useVehicles, VehiclesContext }