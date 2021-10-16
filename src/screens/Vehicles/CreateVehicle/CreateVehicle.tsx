import { Button, Col, Input, Row, Form } from 'antd';
import 'antd/dist/antd.css';
import { FormInput } from '../../../components/FormInput';
import {Paper} from '../../../components/Paper'
import styled from 'styled-components';

export const CreateVehicle: React.FC = () => {
  const onSend=()=>{
      
  }
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
      <Col span={12} style={{padding:'8px 16px'}}>
      <Form.Item
        label="Propietario"
        name="propietario"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      </Col>
      <Col span={12} style={{padding:'8px 16px'}}>
      <Form.Item
        label="Placa"
        name="placa"
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
      <Col span={12} style={{padding:'8px 16px'}}>
      <Form.Item
        label="Año de Fabricación"
        name="anho"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      </Col>
      <Col span={12} style={{padding:'8px 16px'}}>
      <Form.Item
        label="Categoría"
        name="categoria"
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
      <Col span={12} style={{padding:'8px 16px'}}>
      <Form.Item
        label="Marca"
        name="marca"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      </Col>
      <Col span={12} style={{padding:'8px 16px'}}>
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
    <Button type="primary" htmlType="submit">Registrar Vehiculo</Button>
    </StyledBottomButtons>
      </Form.Item>
      </Form>
        
        
        
   
    </Paper>
  );
}

const StyledBottomButtons = styled.div`
margin-top: 24px;
  display:flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 24px;
`