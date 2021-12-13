import axios from "axios";
import React from "react";
import {
  IVehicles,
  IVehiclesFromApi,
  IVehiclesToApi,
} from "../../../../shared/api";
import { useAuth } from "../../../../shared/AuthContext/AuthContext";

//import { User } from '../../shared/api'
//import { client } from '../../shared/client'

export interface VehiclesContextValue {
  vehicles: IVehicles[];
  vehicleSelected: IVehicles | undefined;
  createVehicle: (vehicleSel: IVehiclesToApi) => void;
  updateVehicle: (vehicle: IVehiclesToApi, placa: string) => void;
  deleteVehicle: (placa: string) => void;
  selectVehicle: (vehicleSel: IVehicles | undefined) => void;
  loading: boolean;
  error: boolean;
}

const VehiclesContext = React.createContext<VehiclesContextValue | undefined>(
  undefined
);

const VehiclesProvider: React.FC = ({ children }) => {
  const [vehicles, setVehicles] = React.useState<IVehicles[]>([]);
  const [vehicleSelected, setVehicleSelected] = React.useState<
    IVehicles | undefined
  >();
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { token } = useAuth();

  React.useEffect(() => {
    async function getVehicles() {
      setLoading(true);
      try {
        axios
          .get<Array<IVehiclesFromApi>>(
            `https://quiet-eyrie-82714.herokuapp.com/api/vehicles`,
            {
              headers: {
                Authorization: `Bearer ${token?.access_token}`,
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
            const getVehicles: Array<IVehiclesFromApi> = res.data;
            console.log(getVehicles);
            setVehicles(
              getVehicles.map((element, index) => {
                const { placa, tipo, usuario, unidad, anho } = element;
                return {
                  key: `vehicles-list-item-${placa}`,
                  placa,
                  tipo,
                  usuario,
                  unidad,
                  anho,
                };
              })
            );
          });
        setLoading(false);
      } catch (err: unknown) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    }
    getVehicles();
  }, [token]);

  const selectVehicle = (vehicle: IVehicles | undefined) => {
    setVehicleSelected(vehicle);
  };

  const createVehicle = (vehicle: IVehiclesToApi) => {
    console.log(vehicle);
    axios
      .post<IVehiclesFromApi>(
        `https://quiet-eyrie-82714.herokuapp.com/api/vehicles`,
        vehicle,
        {
          headers: {
            Authorization: `Bearer ${token?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        const { placa, tipo, usuario, unidad, anho } = res.data;
        setVehicles([
          ...vehicles,
          {
            key: `vehicles-list-item-${placa}`,
            placa,
            tipo,
            usuario,
            unidad,
            anho,
          },
        ]);
      });
  };

  const updateVehicle = (vehicle: IVehiclesToApi, placa: string) => {
    axios
      .put<IVehiclesFromApi>(
        `http://quiet-eyrie-82714.herokuapp.com/api/vehicles/${placa}`,
        vehicle,
        {
          headers: {
            Authorization: `Bearer ${token?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setVehicles([
          ...vehicles.filter((vehicleValue) => vehicleValue.placa !== placa),
          { ...vehicle, placa, key: `vehicles-list-item-${placa}` },
        ]);
        setVehicleSelected(undefined);
      });
  };
  const deleteVehicle = (placa: string) => {
    setLoading(true);
    try {
      axios.delete(
        `http://quiet-eyrie-82714.herokuapp.com/api/vehicles/${placa}`,
        {
          headers: {
            Authorization: `Bearer ${token?.access_token}`,
            Accept: "application/json",
          },
        }
      );
      setLoading(false);
      setVehicles(
        vehicles.filter((vehicleValue) => vehicleValue.placa !== placa)
      );
      setVehicleSelected(undefined);
    } catch (err: unknown) {
      console.error(err);
      setError(true);
      setLoading(false);
      setVehicleSelected(undefined);
    }
  };

  return (
    <VehiclesContext.Provider
      value={{
        vehicles,
        error,
        loading,
        vehicleSelected,
        selectVehicle,
        createVehicle,
        updateVehicle,
        deleteVehicle,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
};

function useVehicles(): VehiclesContextValue {
  const context = React.useContext(VehiclesContext);
  if (typeof context === "undefined") {
    throw Error("The context isn't defined");
  }
  return context;
}

export { VehiclesProvider, useVehicles, VehiclesContext };
