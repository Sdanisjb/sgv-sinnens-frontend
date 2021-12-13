//CU-03 Registrar un nuevo vehículo
import { Button, Col, Input, Row, Form, Select, InputNumber } from "antd";
import "antd/dist/antd.css";
import { Paper } from "../../../components/Paper";
import styled from "styled-components";
import { useVehicles } from "../shared/VehiclesContext/VehiclesContext";
import { IVehiclesToApi } from "../../../shared/api";
import { useHistory } from "react-router-dom";
import { Option } from "antd/lib/mentions";

export const CreateVehicle: React.FC = () => {
  const { createVehicle } = useVehicles();
  const history = useHistory();
  const onSend = (event: IVehiclesToApi) => {
    createVehicle(event);
    history.push("/vehicles");
  };
  return (
    <Paper>
      <h1>Ingresa los Datos del Nuevo Vehículo</h1>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onSend}
        autoComplete="off"
      >
        <Row>
          <Col span={12} style={{ padding: "8px 16px" }}>
            <Form.Item
              label="Propietario"
              name="usuario"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select>
                <Option value="CERRO VERDE">CERRO VERDE</Option>
                <Option value="SINNENS">SINNENS</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12} style={{ padding: "8px 16px" }}>
            <Form.Item
              label="Placa"
              name="placa"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input maxLength={7} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ padding: "8px 16px" }}>
            <Form.Item
              label="Año de Fabricación"
              name="anho"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                min={1950}
                max={2030}
                style={{ width: "100%" }}
                maxLength={4}
              />
            </Form.Item>
          </Col>
          <Col span={12} style={{ padding: "8px 16px" }}>
            <Form.Item
              label="Tipo"
              name="tipo"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select>
                <Option value="M1">M1</Option>
                <Option value="M2">M2</Option>
                <Option value="M3">M3</Option>
                <Option value="N1">N1</Option>
                <Option value="N2">N2</Option>
                <Option value="N3">N3</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ padding: "8px 16px" }}>
            <Form.Item
              label="Tipo de Unidad"
              name="unidad"
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
              Registrar Vehiculo
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
