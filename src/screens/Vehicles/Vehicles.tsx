import { Button, Checkbox, Switch, Table } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useVehicles } from "./shared/VehiclesContext/VehiclesContext";
import { IVehicles } from "../../shared/api";
import { DeleteVehicle } from "./DeleteVehicle/DeleteVehicle";
import ReactApexCharts from "react-apexcharts";
import { useEffect, useState } from "react";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { ColumnsType } from "antd/lib/table";
import FilterWords from "../../shared/filters/FilterWords";
import FilterYears from "../../shared/filters/FilterYears";

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

const plainCheckOptions = ["Año", "Tipo de Unidad", "Tipo", "Propietario"];
const defaultCheckedList = ["Año"];

export const Vehicles: React.FC = () => {
  const { vehicles, selectVehicle, vehicleSelected } = useVehicles();
  const [showCharts, setShowCharts] = useState(false);
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [seriesYear, setSeriesYear] = useState<{ [key: string]: number }>({});
  const [seriesUnidad, setSeriesUnidad] = useState<{ [key: string]: number }>(
    {}
  );
  const [seriesTipo, setSeriesTipo] = useState<{ [key: string]: number }>({});
  const [seriesUser, setSeriesUser] = useState<{ [key: string]: number }>({});

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
  function onChangeSwitch(checked: boolean) {
    setShowCharts(checked);
  }
  const onChangeCheck = (checkedValue: CheckboxValueType[]) => {
    setCheckedList(checkedValue);
    setIndeterminate(
      !!checkedValue.length && checkedValue.length < plainCheckOptions.length
    );
    setCheckAll(checkedValue.length === plainCheckOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainCheckOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  return (
    <>
      <StyledUpperButtons>
        <Button type="primary" onClick={newVehicle}>
          Nuevo Vehiculo
        </Button>
        <StyledRightUpperButtons>
          <h4>Mostrar:</h4>
          <Switch
            checkedChildren="Gráficos"
            unCheckedChildren="Tablas"
            onChange={onChangeSwitch}
          />
        </StyledRightUpperButtons>
      </StyledUpperButtons>
      {showCharts ? (
        <>
          <h3>Mostrar Grafico Resumen de:</h3>
          <Checkbox.Group
            options={plainCheckOptions}
            value={checkedList}
            onChange={onChangeCheck}
          />
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Seleccionar Todos
          </Checkbox>
          <StyledChartGroup>
            {checkedList.includes("Año") && (
              <StyledPaper>
                <h4>Año de Fabricación:</h4>
                <ReactApexCharts
                  options={{
                    chart: {
                      width: 440,
                      type: "donut",
                    },
                    labels: Object.keys(seriesYear),
                  }}
                  series={Object.values(seriesYear)}
                  type="donut"
                  width={440}
                />
              </StyledPaper>
            )}
            {checkedList.includes("Tipo") && (
              <StyledPaper>
                <h4>Tipo:</h4>
                <ReactApexCharts
                  options={{
                    chart: {
                      width: 440,
                      type: "donut",
                    },
                    labels: Object.keys(seriesTipo),
                  }}
                  series={Object.values(seriesTipo)}
                  type="donut"
                  width={440}
                />
              </StyledPaper>
            )}
            {checkedList.includes("Tipo de Unidad") && (
              <StyledPaper>
                <h4>Tipo de Unidad:</h4>
                <ReactApexCharts
                  options={{
                    chart: {
                      width: 440,
                      type: "donut",
                    },
                    labels: Object.keys(seriesUnidad),
                  }}
                  series={Object.values(seriesUnidad)}
                  type="donut"
                  width={440}
                />
              </StyledPaper>
            )}
            {checkedList.includes("Propietario") && (
              <StyledPaper>
                <h4>Propietario:</h4>
                <ReactApexCharts
                  options={{
                    chart: {
                      width: 440,
                      type: "donut",
                    },
                    labels: Object.keys(seriesUser),
                  }}
                  series={Object.values(seriesUser)}
                  type="donut"
                  width={440}
                />
              </StyledPaper>
            )}
          </StyledChartGroup>
        </>
      ) : (
        <>
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
      )}
    </>
  );
};

const StyledUpperButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
const StyledChartGroup = styled.div`
  margin-top: 24px;
  gap: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const StyledPaper = styled.div`
  padding: 24px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  background-color: #fff;
`;
