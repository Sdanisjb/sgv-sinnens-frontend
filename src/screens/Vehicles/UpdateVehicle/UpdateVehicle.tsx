import React from 'react';
import { Button, Col, Input, Row, Form } from 'antd';
import 'antd/dist/antd.css';
import {Paper} from '../../../components/Paper'
import styled from 'styled-components';
import { useVehicles } from '../shared/VehiclesContext/VehiclesContext';
import { IVehiclesToApi } from '../../../shared/api';
import { useHistory } from 'react-router-dom';

export const UpdateVehicle: React.FC = () => {
  const {vehicleSelected,updateVehicle}=useVehicles(); 
  const [fields, setFields] = React.useState([
    {
      name: ['usuario'],
      value: vehicleSelected?.usuario,
    },
    {
      name: ['placa'],
      value: vehicleSelected?.placa,
    },
    {
      name: ['anho'],
      value: vehicleSelected?.anho,
    },
    {
      name: ['categoria'],
      value: vehicleSelected?.categoria,
    },
    {
      name: ['marca'],
      value: vehicleSelected?.marca,
    },
    {
      name: ['unidad'],
      value: vehicleSelected?.unidad,
    },
  ]);
  const history = useHistory();

  const onSend=(event:IVehiclesToApi)=>{
    if(vehicleSelected) updateVehicle(event,vehicleSelected.id)
    history.push("/vehicles");
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
      fields={fields}
    >
        <Row>
      <Col span={12} style={{padding:'8px 16px'}}>
      <Form.Item
        label="Propietario"
        name="usuario"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input/>
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
        <Input/>
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
        <Input/>
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
        <Input/>
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
        <Input/>
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
        <Input/>
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