//CU-03 Registrar un nuevo vehículo
import { Button, Col, Input, Row, Form, InputNumber, DatePicker } from "antd";
import "antd/dist/antd.css";
import { Paper } from "../../../components/Paper";
import styled from "styled-components";
import { useMaintenances } from "../shared/MaintenancesContext/MaintenancesContext";
import { IMaintenancesToApi } from "../../../shared/api";
import { useHistory } from "react-router-dom";
import moment from "moment";

const dateFormat = "YYYY-MM-DD";

export const CreateMaintenance: React.FC = () => {
  const { createMaintenance } = useMaintenances();
  const history = useHistory();
  const onSend = (event: any) => {
    createMaintenance({
      ...event,
      fecha_emision: event.fecha_emision.format(dateFormat),
      fecha_salida: event.fecha_salida.format(dateFormat),
    });
    history.push("/maintenances/detail");
  };
  /*
  fecha_emision: string;
  fecha_salida: string;
  nombre_taller: string;
  km_actual: number;
  nro_factura: string;
  nro_proforma: string | null;
  detalle: Array<IDetalle>;
  observaciones: Array<IObservacion>;
*/
  /*const fields = [
    {
      label: "Fecha de Salida",
    },
  ];*/
  return (
    <Paper>
      <h1>Ingresa los Datos del Registro de Mantenimiento</h1>
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
          <Col span={24} style={{ padding: "8px 16px" }}>
            <Form.Item
              label="Nombre del Taller"
              name="nombre_taller"
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
          <Col span={12} style={{ padding: "0 16px" }}>
            <Form.Item
              label="Nro de Proforma"
              name="nro_proforma"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12} style={{ padding: "0 16px" }}>
            <Form.Item
              label="Nro de Factura"
              name="nro_factura"
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
              label="Fecha"
              name="fecha_emision"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} format={dateFormat} />
            </Form.Item>
          </Col>
          <Col span={12} style={{ padding: "8px 16px" }}>
            <Form.Item
              label="Fecha de Salida"
              name="fecha_salida"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} format={dateFormat} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ padding: "8px 16px" }}>
            <div style={{ paddingBottom: 8 }}>Observaciones</div>
            <Form.List name="observaciones">
              {(fields, { add, remove }) => (
                <div>
                  {fields.map((field, index) => (
                    <>
                      <Row>
                        <Col span={1}>
                          <Button onClick={() => remove(index)} type="dashed">
                            X
                          </Button>
                        </Col>
                        <Col span={23}>
                          <Form.Item {...field} name={[index, "descripcion"]}>
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                    </>
                  ))}
                  <Button
                    onClick={() => add()}
                    type="dashed"
                    style={{ marginLeft: 16 }}
                  >
                    Agregar Observación
                  </Button>
                </div>
              )}
            </Form.List>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ padding: "8px 16px" }}>
            <div style={{ paddingBottom: 8 }}>Detalles</div>
            <Form.List name="detalle">
              {(fields, { add, remove }) => (
                <div>
                  {fields.map((field, index) => (
                    <>
                      <Row>
                        <Col span={1}>
                          <Button
                            onClick={() => remove(index)}
                            type="dashed"
                            style={{ marginTop: 20 }}
                          >
                            X
                          </Button>
                        </Col>
                        <Col span={3} style={{ padding: "8px 16px" }}>
                          <Form.Item
                            {...field}
                            name={[index, "monto"]}
                            label="Monto"
                          >
                            <InputNumber />
                          </Form.Item>
                        </Col>
                        <Col span={20} style={{ padding: "8px 16px" }}>
                          <Form.Item
                            {...field}
                            name={[index, "descripcion"]}
                            label="descripcion"
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                    </>
                  ))}
                  <Row>
                    <Button
                      onClick={() => add()}
                      type="dashed"
                      style={{ marginLeft: 16 }}
                    >
                      Agregar Detalle
                    </Button>
                  </Row>
                </div>
              )}
            </Form.List>
          </Col>
        </Row>
        <Form.Item>
          <StyledBottomButtons>
            <Button type="primary" htmlType="submit">
              Guardar Registro
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
