import { Button, Table } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useVehicles } from "./shared/VehiclesContext/VehiclesContext";
import { IVehicles } from "../../shared/api";
import { DeleteVehicle } from "./DeleteVehicle/DeleteVehicle";
//"placa" : "ABC-123", "categoria" : "M1", "usuario" : "SINNENS", "unidad" : "Combi", "anho" : "2010"

const columns = [
  {
    title: "Placa",
    dataIndex: "placa",
    key: "placa",
  },
  {
    title: "Año de Fabricación",
    dataIndex: "anho",
    key: "anho",
  },
  {
    title: "Tipo de Unidad",
    dataIndex: "unidad",
    key: "unidad",
  },
  {
    title: "Categoría",
    dataIndex: "categoria",
    key: "categoria",
  },
];

export const Vehicles: React.FC = () => {
  const { vehicles, selectVehicle, vehicleSelected } = useVehicles();

  const history = useHistory();
  //CU-03 Registrar un nuevo vehículo
  function newVehicle() {
    history.push("/vehicles/create");
  }
  /*CU-04 Editar Vehículo*/
  function updateVehicle() {
    history.push("/vehicles/update");
  }
  function selectRow(selectedRowKeys: React.Key[], selectedRows: IVehicles[]) {
    selectVehicle(selectedRows[0]);
  }
  return (
    <>
      <StyledUpperButtons>
        <Button type="primary" onClick={newVehicle}>
          Nuevo Vehiculo
        </Button>
      </StyledUpperButtons>
      <Table
        rowSelection={{ type: "radio", onChange: selectRow }}
        dataSource={vehicles}
        columns={columns}
      />
      {vehicleSelected ? (
        <StyledBottomButtons>
          {/* CU-05 Borrar Vehículo */}
          <DeleteVehicle />
          <Button type="default" onClick={updateVehicle}>
            Editar Vehiculo
          </Button>
        </StyledBottomButtons>
      ) : (
        <StyledBottomButtons>
          <Button type="dashed" disabled>
            Eliminar Vehiculo
          </Button>
          <Button type="dashed" disabled>
            Editar Vehiculo
          </Button>
        </StyledBottomButtons>
      )}
    </>
  );
};

const StyledUpperButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 24px;
`;
const StyledBottomButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 24px;
  gap: 16px;
`;
