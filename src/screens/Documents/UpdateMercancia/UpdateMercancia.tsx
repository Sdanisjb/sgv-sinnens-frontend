/* CU - 17 Actualizar Permiso de Transporte de Mercancía*/
import React from "react";
import { Button, Col, Row, Form, DatePicker } from "antd";
import "antd/dist/antd.css";
import { Paper } from "../../../components/Paper";
import styled from "styled-components";
import { useDocuments } from "../shared/DocumentsContext/DocumentsContext";
import { IDocuments } from "../../../shared/api";
import { useHistory } from "react-router-dom";
import moment from "moment";

const dateFormat = "YYYY-MM-DD";

export const UpdateMercancia: React.FC = () => {
  const { documentSelected, updateMercancia } = useDocuments();
  const [fields, setFields] = React.useState([
    {
      name: ["permiso_transp_mercancia_venc"],
      value: moment(
        documentSelected?.permiso_transp_mercancia_venc || undefined
      ),
    },
    {
      name: ["permiso_transp_mercancia_renovacion"],
      value: moment(
        documentSelected?.permiso_transp_mercancia_renovacion || undefined
      ),
    },
  ]);
  const history = useHistory();

  const onSend = (event: {
    permiso_transp_mercancia_renovacion: string;
    permiso_transp_mercancia_venc: string;
  }) => {
    if (documentSelected)
      updateMercancia(
        documentSelected.placa,
        event.permiso_transp_mercancia_renovacion,
        event.permiso_transp_mercancia_venc
      );
    history.push("/documents");
  };
  return (
    <Paper>
      <h1>Actualizar Información de Permiso de Mercancia</h1>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onSend}
        autoComplete="off"
        fields={fields}
      >
        <Row>
          <Col span={12} style={{ padding: "8px 16px" }}>
            <Form.Item
              label="Fecha de Vencimiento"
              name="permiso_transp_mercancia_venc"
            >
              <DatePicker style={{ width: "100%" }} format={dateFormat} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ padding: "8px 16px" }}>
            <Form.Item
              label="Fecha de Renovación"
              name="permiso_transp_mercancia_renovacion"
            >
              <DatePicker style={{ width: "100%" }} format={dateFormat} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <StyledBottomButtons>
            <Button type="primary" htmlType="submit">
              Guardar Cambios
            </Button>
          </StyledBottomButtons>
        </Form.Item>
      </Form>
    </Paper>
  );
};

const StyledBottomButtons = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 24px;
`;
