/* React-Component Notifications
Implementacion de la clase Panel Notificaciones
Por defecto retorna el renderizado de la pantalla Notifications
Interactua con el controlador Notificacion para poder acceder a los metodos:
- getNotification
- updateNotification
*/

import React from "react";
import { Button, Col, Row, Form, InputNumber } from "antd";
import "antd/dist/antd.css";
import { Paper } from "../../components/Paper";
import styled from "styled-components";

export const Notifications: React.FC = () => {
  const [fields, setFields] = React.useState([
    {
      name: ["dias"],
      value: 2,
    },
  ]);

  const onSend = (event: {
    permiso_mtc_renovacion: string;
    permiso_mtc_venc: string;
  }) => {};
  return (
    <Paper>
      <h1>Definir Cantidad de Días de Anticipación para Notificaciones</h1>
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
            <Form.Item label="Cantidad de Días" name="dias">
              <InputNumber />
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
