/*CU-04 Editar Vehículo*/
import React from "react";
import { Button, Col, Input, Row, Form } from "antd";
import "antd/dist/antd.css";
import { Paper } from "../../../components/Paper";
import styled from "styled-components";
import { useDocuments } from "../shared/DocumentsContext/DocumentsContext";
import { IDocuments } from "../../../shared/api";
import { useHistory } from "react-router-dom";

export const UpdateSoat: React.FC = () => {
  const { documentSelected, updateSoat } = useDocuments();
  const [fields, setFields] = React.useState([
    {
      name: ["soat_venc"],
      value: documentSelected?.soat_venc,
    },
    {
      name: ["soat_renovacion"],
      value: documentSelected?.soat_renovacion,
    },
  ]);
  const history = useHistory();

  const onSend = (event: { soat_renovacion: string; soat_venc: string }) => {
    if (documentSelected)
      updateSoat(
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
            <Form.Item
              label="Fecha de Emisión"
              name="soat_venc"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ padding: "8px 16px" }}>
            <Form.Item
              label="Fecha de Vencimiento"
              name="soat_renovacion"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
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
