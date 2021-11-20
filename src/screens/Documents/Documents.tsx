import { Button, Table } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDocuments } from "./shared/DocumentsContext/DocumentsContext";
import { IDocuments } from "../../shared/api";
import { paths } from "../../shared/routes/paths";
//"placa" : "ABC-123", "categoria" : "M1", "usuario" : "SINNENS", "unidad" : "Combi", "anho" : "2010"

const columns = [
  {
    title: "Placa",
    dataIndex: "placa",
    key: "placa",
  },
  {
    title: "SOAT",
    dataIndex: "soat_venc",
    key: "soat_venc",
  },
  {
    title: "ITV AUTRISA",
    dataIndex: "permiso_autrisa_venc",
    key: "permiso_autrisa_venc",
  },
  {
    title: "ITV MTC",
    dataIndex: "permiso_mtc_venc",
    key: "permiso_mtc_venc",
  },
  {
    title: "Transporte Mercancia",
    dataIndex: "permiso_transp_mercancia_venc",
    key: "permiso_transp_mercancia_venc",
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
