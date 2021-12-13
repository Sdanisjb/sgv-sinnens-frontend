import { Button, Checkbox, Divider, Switch, Table } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useVehicles } from "../../Vehicles/shared/VehiclesContext/VehiclesContext";
import { IDetalle, IMaintenances } from "../../../shared/api";
import ReactApexCharts from "react-apexcharts";
import { useEffect, useState } from "react";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { RightOutlined } from "@ant-design/icons";
import { useMaintenances } from "../shared/MaintenancesContext/MaintenancesContext";
import { DeleteMaintenance } from "../DeleteMaintenance/DeleteVehicle";
//"placa" : "ABC-123", "tipo" : "M1", "usuario" : "SINNENS", "unidad" : "Combi", "anho" : "2010"

const columns = [
  {
    title: "Fecha",
    dataIndex: "fecha_emision",
    key: "fecha_emision",
  },
  {
    title: "Taller",
    dataIndex: "nombre_taller",
    key: "nombre_taller",
  },
  {
    title: "Costo Total",
    dataIndex: "detalle",
    render: (item: Array<IDetalle>) => (
      <div>{item.reduce((a, b) => a + b.monto, 0)}</div>
    ),
    key: "detalle",
  },
  {
    title: "# de Observaciones",
    dataIndex: ["observaciones", "length"],
    key: "observaciones",
  },
];

const defaultCheckedList = ["Año"];

export const MaintenancesDetail: React.FC = () => {
  const { vehicleSelected } = useVehicles();
  const { maintenances, selectMaintenance, maintenanceSelected } =
    useMaintenances();

  const history = useHistory();
  function selectRow(
    selectedRowKeys: React.Key[],
    selectedRows: IMaintenances[]
  ) {
    selectMaintenance(selectedRows[0]);
  }

  function newMaintenance() {
    history.push("/maintenances/create");
  }
  function updateMaintenance() {
    history.push("/maintenances/update");
  }

  return (
    <>
      <StyledUpperButtons>
        <Button type="primary" onClick={newMaintenance}>
          Nuevo Registro
        </Button>
      </StyledUpperButtons>

      <Table
        rowSelection={{ type: "radio", onChange: selectRow }}
        dataSource={maintenances}
        columns={columns}
      />
      {maintenanceSelected ? (
        <StyledBottomButtons>
          <DeleteMaintenance />
          <Button type="default" onClick={updateMaintenance}>
            Editar Registro
          </Button>
        </StyledBottomButtons>
      ) : (
        <StyledBottomButtons>
          <Button type="dashed" disabled>
            Eliminar Registro
          </Button>
          <Button type="dashed" disabled>
            Editar Registro
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
const StyledRightUpperButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
const StyledBottomButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 16px;
`;
