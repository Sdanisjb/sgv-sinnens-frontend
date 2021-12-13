/* 
Contexto de Registros de Mantenimiento
Implementacion de la clase controlador Registro de Mantenimiento
Atributos:
- maintenances
- maintenanceSelected
Metodos:
- selectmaintenance
- createmaintenance
- updatemaintenance
- deletemaintenance
*/

import axios from "axios";
import React from "react";
import {
  IMaintenances,
  IMaintenancesFromApi,
  IMaintenancesToApi,
} from "../../../../shared/api";
import { useAuth } from "../../../../shared/AuthContext/AuthContext";
import { useVehicles } from "../../../Vehicles/shared/VehiclesContext/VehiclesContext";

export interface MaintenancesContextValue {
  maintenances: IMaintenances[];
  maintenanceSelected: IMaintenances | undefined;
  createMaintenance: (maintenanceSel: IMaintenancesToApi) => void;
  updateMaintenance: (maintenance: IMaintenancesToApi, id: number) => void;
  deleteMaintenance: (id: number) => void;
  selectMaintenance: (maintenanceSel: IMaintenances | undefined) => void;
  loading: boolean;
  error: boolean;
}

const MaintenancesContext = React.createContext<
  MaintenancesContextValue | undefined
>(undefined);

const MaintenancesProvider: React.FC = ({ children }) => {
  const { vehicleSelected } = useVehicles();
  const [maintenances, setMaintenances] = React.useState<IMaintenances[]>([]);
  const [maintenanceSelected, setmaintenanceSelected] = React.useState<
    IMaintenances | undefined
  >();
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { token } = useAuth();

  React.useEffect(() => {
    async function getMaintenances() {
      if (!vehicleSelected) return;
      setLoading(true);
      try {
        axios
          .get<{ data: Array<IMaintenancesFromApi> }>(
            `https://quiet-eyrie-82714.herokuapp.com/api/vehicles/${vehicleSelected?.placa}/registros_mantenimiento`,
            {
              headers: {
                Authorization: `Bearer ${token?.access_token}`,
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
            const getMaintenance: Array<IMaintenancesFromApi> = res.data.data;
            console.log("getMaintenance");
            console.log(getMaintenance);
            setMaintenances(
              getMaintenance.map((element, index) => {
                const {
                  id,
                  placa_vehiculo,
                  fecha_emision,
                  fecha_salida,
                  nombre_taller,
                  km_actual,
                  nro_factura,
                  nro_proforma,
                  detalle,
                  observaciones,
                } = element;
                return {
                  key: `maintenances-list-item-${id}`,
                  id,
                  placa_vehiculo,
                  fecha_emision,
                  fecha_salida,
                  nombre_taller,
                  km_actual,
                  nro_factura,
                  nro_proforma,
                  detalle,
                  observaciones,
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
    getMaintenances();
  }, [token, vehicleSelected]);

  const selectMaintenance = (Maintenance: IMaintenances | undefined) => {
    setmaintenanceSelected(Maintenance);
  };

  const createMaintenance = (maintenance: IMaintenancesToApi) => {
    console.log(maintenance);

    axios
      .post<IMaintenancesFromApi>(
        `https://quiet-eyrie-82714.herokuapp.com/api/vehicles/${vehicleSelected?.placa}/registros_mantenimiento`,
        {
          ...maintenance,
          detalle: maintenance.detalle || [],
          observaciones: maintenance.observaciones || [],
        },
        {
          headers: {
            Authorization: `Bearer ${token?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        const { id } = res.data;
        setMaintenances([
          ...maintenances,
          {
            key: `maintenances-list-item-${id}`,
            id,
            placa_vehiculo: maintenance.placa_vehiculo,
            fecha_emision: maintenance.fecha_emision,
            fecha_salida: maintenance.fecha_salida,
            nombre_taller: maintenance.nombre_taller,
            km_actual: maintenance.km_actual,
            nro_factura: maintenance.nro_factura,
            nro_proforma: maintenance.nro_proforma,
            detalle: maintenance.detalle,
            observaciones: maintenance.observaciones,
          },
        ]);
      });
  };

  const updateMaintenance = (maintenance: IMaintenancesToApi, id: number) => {
    axios
      .put<IMaintenancesFromApi>(
        `https://quiet-eyrie-82714.herokuapp.com/api/vehicles/${vehicleSelected?.placa}/registros_mantenimiento/${id}`,
        maintenance,
        {
          headers: {
            Authorization: `Bearer ${token?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setMaintenances([
          ...maintenances.filter(
            (maintenanceValue) => maintenanceValue.id !== id
          ),
          { ...maintenance, id, key: `maintenances-list-item-${id}` },
        ]);
        setmaintenanceSelected(undefined);
      });
  };
  const deleteMaintenance = async (id: number) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `https://quiet-eyrie-82714.herokuapp.com/api/vehicles/${vehicleSelected?.placa}/registros_mantenimiento/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token?.access_token}`,
            Accept: "application/json",
          },
        }
      );
      console.log(response);
      setLoading(false);
      setMaintenances(
        maintenances.filter((maintenanceValue) => maintenanceValue.id !== id)
      );
      setmaintenanceSelected(undefined);
    } catch (err: unknown) {
      console.error(err);
      setError(true);
      setLoading(false);
      setmaintenanceSelected(undefined);
    }
  };

  return (
    <MaintenancesContext.Provider
      value={{
        maintenances,
        error,
        loading,
        maintenanceSelected,
        selectMaintenance,
        createMaintenance,
        updateMaintenance,
        deleteMaintenance,
      }}
    >
      {children}
    </MaintenancesContext.Provider>
  );
};

function useMaintenances(): MaintenancesContextValue {
  const context = React.useContext(MaintenancesContext);
  if (typeof context === "undefined") {
    throw Error("The context isn't defined");
  }
  return context;
}

export { MaintenancesProvider, useMaintenances, MaintenancesContext };
