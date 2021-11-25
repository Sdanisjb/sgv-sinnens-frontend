/* CU - 12 Editar Empleado */
import React from "react";
import { Button, Col, Input, Row, Form } from "antd";
import "antd/dist/antd.css";
import { Paper } from "../../../components/Paper";
import styled from "styled-components";
import { useUsers } from "../shared/UsersContext/UsersContext";
import { IUsersToApi } from "../../../shared/api";
import { useHistory } from "react-router-dom";
import { paths } from "../../../shared/routes/paths";

export const UpdateUser: React.FC = () => {
  const { userSelected, updateUser } = useUsers();
  const [fields, setFields] = React.useState([
    {
      name: ["DNI"],
      value: userSelected?.DNI,
    },
    {
      name: ["apellidos"],
      value: userSelected?.apellidos,
    },
    {
      name: ["nombres"],
      value: userSelected?.nombres,
    },
    {
      name: ["email"],
      value: userSelected?.email,
    },
  ]);
  const history = useHistory();

  const onSend = (event: IUsersToApi) => {
    if (userSelected) updateUser(event, userSelected.DNI);
    history.push(paths.users.default);
  };
  return (
    <Paper>
      <h1>Ingresa los Datos del Nuevo Empleado</h1>
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
              label="Apellidos"
              name="apellidos"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12} style={{ padding: "8px 16px" }}>
            <Form.Item
              label="Nombres"
              name="nombres"
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
              label="DNI"
              name="DNI"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12} style={{ padding: "8px 16px" }}>
            <Form.Item
              label="Correo Electrónico"
              name="email"
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
              Registrar Empleado
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
