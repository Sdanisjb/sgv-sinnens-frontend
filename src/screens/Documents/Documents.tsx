import { Button, Table } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDocuments } from "./shared/DocumentsContext/DocumentsContext";
import { IDocuments } from "../../shared/api";
import { paths } from "../../shared/routes/paths";
//"placa" : "ABC-123", "categoria" : "M1", "usuario" : "SINNENS", "unidad" : "Combi", "anho" : "2010"

const renderCellWColor = (text: string) => {
  if (!text) {
    return {
      children: <div>-</div>,
    };
  }
  const today = new Date();
  const date = new Date(text);
  const daysUntil = Math.floor(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  console.log(daysUntil);
  return {
    props: {
      style: {
        background:
          daysUntil > 60
            ? "#4C48"
            : daysUntil > 30
            ? "#CC48"
            : daysUntil > 15
            ? "#C948"
            : daysUntil > 0
            ? "#C448"
            : "#C44E",
      },
    },
    children: <div>{text}</div>,
  };
};
const columns = [
  {
    title: "Placa",
    dataIndex: "placa",
    key: "placa",
    sorter: (a: IDocuments, b: IDocuments) =>
      a.placa.charCodeAt(0) * 10000 -
      b.placa.charCodeAt(0) * 10000 +
      (a.placa.charCodeAt(1) * 100 - b.placa.charCodeAt(1) * 100) +
      (a.placa.charCodeAt(2) - b.placa.charCodeAt(2)),
  },
  {
    title: "SOAT",
    dataIndex: "soat_venc",
    key: "soat_venc",
    render: renderCellWColor,
  },
  {
    title: "ITV AUTRISA",
    dataIndex: "permiso_autrisa_venc",
    key: "permiso_autrisa_venc",
    render: renderCellWColor,
  },
  {
    title: "ITV MTC",
    dataIndex: "permiso_mtc_venc",
    key: "permiso_mtc_venc",
    render: renderCellWColor,
  },
  {
    title: "Transporte Mercancia",
    dataIndex: "permiso_transp_mercancia_venc",
    key: "permiso_transp_mercancia_venc",
    render: renderCellWColor,
  },
];

export const Documents: React.FC = () => {
  const { documents, selectDocument, documentSelected } = useDocuments();

  const history = useHistory();
  function routeSoat() {
    history.push(paths.documents.soat);
  }
  function routeAutrisa() {
    history.push(paths.documents.autrisa);
  }
  function routeMtc() {
    history.push(paths.documents.mtc);
  }
  function routeMercancia() {
    history.push(paths.documents.mercancia);
  }
  function selectRow(selectedRowKeys: React.Key[], selectedRows: IDocuments[]) {
    selectDocument(selectedRows[0]);
  }
  return (
    <>
      <Table
        rowSelection={{ type: "radio", onChange: selectRow }}
        dataSource={documents}
        columns={columns}
      />
      {documentSelected ? (
        <StyledBottomButtons>
          <Button type="default" onClick={routeSoat}>
            Actualizar SOAT
          </Button>
          <Button type="default" onClick={routeAutrisa}>
            Actualizar ITV Autrisa
          </Button>
          <Button type="default" onClick={routeMtc}>
            Actualizar ITV MTC
          </Button>
          <Button type="default" onClick={routeMercancia}>
            Actualizar Trans. Merc.
          </Button>
        </StyledBottomButtons>
      ) : (
        <StyledBottomButtons>
          <Button type="dashed" disabled>
            Actualizar SOAT
          </Button>
          <Button type="dashed" disabled>
            Actualizar ITV Autrisa
          </Button>
          <Button type="dashed" disabled>
            Actualizar ITV MTC
          </Button>
          <Button type="dashed" disabled>
            Actualizar Trans. Merc.
          </Button>
        </StyledBottomButtons>
      )}
    </>
  );
};

const StyledBottomButtons = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  gap: 16px;
  width: 160px;
`;
