/* CU - 14 Actualizar SOAT*/
/* CU - 15 Actualizar ITV Autrisa*/
/* CU - 16 Actualizar ITV MTC*/
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

export const UpdateItvAutrisa: React.FC = () => {
  const { documentSelected, updateItvAutrisa } = useDocuments();
  const [fields, setFields] = React.useState([
    {
      name: ["soat_venc"],
      value: moment(documentSelected?.permiso_autrisa_venc || undefined),
    },
    {
      name: ["soat_renovacion"],
      value: moment(documentSelected?.permiso_autrisa_renovacion || undefined),
    },
  ]);
  const history = useHistory();

  const onSend = (event: { soat_renovacion: string; soat_venc: string }) => {
    if (documentSelected)
      updateItvAutrisa(
        documentSelected.placa,
        event.soat_renovacion,
        event.soat_venc
      );
    history.push("/documents");
  };
  return (
    <Paper>
      <h1>Actualizar Información de SOAT</h1>
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
            <Form.Item label="Fecha de Vencimiento" name="soat_venc">
              <DatePicker style={{ width: "100%" }} format={dateFormat} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ padding: "8px 16px" }}>
            <Form.Item label="Fecha de Renovación" name="soat_renovacion">
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
