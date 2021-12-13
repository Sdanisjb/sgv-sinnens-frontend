/* React-Component Maintenances
Implementacion de la clase Panel Registro Mantenimiento
Por defecto retorna el renderizado de la pantalla Maintenances
Interactua con el controlador Registro Mantenimiento para poder acceder a los metodos:
- getMaintenances
- createMaintenance
- updateMaintenance
- deleteMaintenance
*/
import { Button, Checkbox, Divider, Switch, Table } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useVehicles } from "../Vehicles/shared/VehiclesContext/VehiclesContext";
import { IVehicles } from "../../shared/api";
import ReactApexCharts from "react-apexcharts";
import { useEffect, useState } from "react";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { RightOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import FilterWords from "../../shared/filters/FilterWords";
import FilterYears from "../../shared/filters/FilterYears";
//"placa" : "ABC-123", "tipo" : "M1", "usuario" : "SINNENS", "unidad" : "Combi", "anho" : "2010"

const columns: ColumnsType<IVehicles> = [
  {
    title: "Placa",
    dataIndex: "placa",
    key: "placa",
    sorter: (a: IVehicles, b: IVehicles) =>
      a.placa.charCodeAt(0) * 10000 -
      b.placa.charCodeAt(0) * 10000 +
      (a.placa.charCodeAt(1) * 100 - b.placa.charCodeAt(1) * 100) +
      (a.placa.charCodeAt(2) - b.placa.charCodeAt(2)),
    filterDropdown: FilterWords,
    onFilter: (value: string | number | boolean, record: IVehicles) =>
      record.placa
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase()),
  },
  {
    title: "Año de Fabricación",
    dataIndex: "anho",
    key: "anho",
    sorter: (a: IVehicles, b: IVehicles) => a.anho - b.anho,
    filterSearch: true,
    filtered: true,
    filterDropdown: FilterYears,
    onFilter: (value: string | number | boolean, record: IVehicles) =>
      record.anho.toString().includes(value.toString()),
  },
  {
    title: "Tipo de Unidad",
    dataIndex: "unidad",
    key: "unidad",
    sorter: (a: IVehicles, b: IVehicles) =>
      a.placa.charCodeAt(0) * 10000 -
      b.placa.charCodeAt(0) * 10000 +
      (a.placa.charCodeAt(1) * 100 - b.placa.charCodeAt(1) * 100) +
      (a.placa.charCodeAt(2) - b.placa.charCodeAt(2)),
    filterDropdown: FilterWords,
    onFilter: (value: string | number | boolean, record: IVehicles) =>
      record.unidad
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase()),
  },
  {
    title: "Tipo",
    dataIndex: "tipo",
    key: "tipo",
    sorter: (a: IVehicles, b: IVehicles) =>
      a.tipo.charCodeAt(0) * 100 -
      b.tipo.charCodeAt(0) * 100 +
      a.tipo.charCodeAt(1) -
      b.tipo.charCodeAt(1),
    filters: [
      {
        text: "M1",
        value: "M1",
      },
      {
        text: "M2",
        value: "M2",
      },
      {
        text: "M3",
        value: "M3",
      },
      {
        text: "N1",
        value: "N1",
      },
      {
        text: "N2",
        value: "N2",
      },
      {
        text: "N3",
        value: "N3",
      },
    ],
    onFilter: (value: string | number | boolean, record: IVehicles) =>
      typeof value === "string" ? record.tipo.indexOf(value) === 0 : false,
  },
  {
    title: "Propietario",
    dataIndex: "usuario",
    key: "usuario",
    sorter: (a: IVehicles, b: IVehicles) =>
      a.usuario.charCodeAt(0) * 10000 -
      b.usuario.charCodeAt(0) * 10000 +
      (a.usuario.charCodeAt(1) * 100 - b.usuario.charCodeAt(1) * 100) +
      (a.usuario.charCodeAt(2) - b.usuario.charCodeAt(2)),
    filters: [
      {
        text: "SINNENS",
        value: "SINNENS",
      },
      {
        text: "CERRO VERDE",
        value: "CERRO VERDE",
      },
    ],
    onFilter: (value: string | number | boolean, record: IVehicles) =>
      typeof value === "string" ? record.usuario.indexOf(value) === 0 : false,
  },
];

export const Maintenances: React.FC = () => {
  const { vehicles, selectVehicle, vehicleSelected } = useVehicles();
  const [seriesYear, setSeriesYear] = useState<{ [key: string]: number }>({});
  const [seriesUnidad, setSeriesUnidad] = useState<{ [key: string]: number }>(
    {}
  );
  const [seriesTipo, setSeriesTipo] = useState<{ [key: string]: number }>({});
  const [seriesUser, setSeriesUser] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    selectVehicle(undefined);
  }, []);
  useEffect(() => {
    const auxSeriesYear = seriesYear;
    const auxSeriesUnidad = seriesUnidad;
    const auxSeriesTipo = seriesTipo;
    const auxSeriesUser = seriesUser;
    vehicles.forEach((vehicle) => {
      const anho = vehicle.anho.toString();
      const { unidad, tipo, usuario } = vehicle;
      if (auxSeriesYear[anho]) auxSeriesYear[anho] += 1;
      else auxSeriesYear[anho] = 1;
      if (auxSeriesUnidad[unidad]) auxSeriesUnidad[unidad] += 1;
      else auxSeriesUnidad[unidad] = 1;
      if (auxSeriesTipo[tipo]) auxSeriesTipo[tipo] += 1;
      else auxSeriesTipo[tipo] = 1;
      if (auxSeriesUser[usuario]) auxSeriesUser[usuario] += 1;
      else auxSeriesUser[usuario] = 1;
    });
    setSeriesYear(auxSeriesYear);
    setSeriesUnidad(auxSeriesUnidad);
    setSeriesTipo(auxSeriesTipo);
    setSeriesUser(auxSeriesUser);
  }, [vehicles]);

  const history = useHistory();
  function maintenanceDetail() {
    history.push("/maintenances/detail");
  }
  function selectRow(selectedRowKeys: React.Key[], selectedRows: IVehicles[]) {
    selectVehicle(selectedRows[0]);
  }

  return (
    <>
      <StyledUpperButtons>
        {vehicleSelected ? (
          <Button
            type="primary"
            onClick={maintenanceDetail}
            icon={<RightOutlined />}
          >
            Ver Mantenimientos
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={maintenanceDetail}
            icon={<RightOutlined />}
            disabled
          >
            Ver Mantenimientos
          </Button>
        )}
      </StyledUpperButtons>

      <Table
        rowSelection={{ type: "radio", onChange: selectRow }}
        dataSource={vehicles}
        columns={columns}
      />
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
