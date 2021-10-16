
import { Button, Table } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
//"placa" : "ABC-123", "categoria" : "M1", "usuario" : "SINNENS", "unidad" : "Combi", "anho" : "2010" 
const dataSource = [
    {
      key:'1',
      placa : "ABC-123", categoria : "M1", usuario : "SINNENS", unidad : "Combi", anho : "2010" 
    },
    {
      key:'2',
      placa : "ABC-121", categoria : "M2", usuario : "SINENS", unidad : "Combii", anho : "2011" 
    },
    {
      key:'3',
      placa : "ABC-121", categoria : "M2", usuario : "SINENS", unidad : "Combii", anho : "2011" 
    },
    {
      key:'4',
      placa : "ABC-121", categoria : "M2", usuario : "SINENS", unidad : "Combii", anho : "2011" 
    },
    {
      key:'5',
      placa : "ABC-121", categoria : "M2", usuario : "SINENS", unidad : "Combii", anho : "2011" 
    },
  ];
  
  const columns = [
    {
      title: 'Placa',
      dataIndex: 'placa',
      key: 'placa',
    },
    {
      title: 'Año de Fabricación',
      dataIndex: 'anho',
      key: 'anho',
    },
    {
      title: 'Tipo de Unidad',
      dataIndex: 'unidad',
      key: 'unidad',
    },
    {
      title: 'Categoría',
      dataIndex: 'categoria',
      key: 'categoria',
    },
  ];
  

type TypeVehicles={
  key?:string,
  placa : string, 
  categoria : string, 
  usuario : string, 
  unidad : string, 
  anho : string 
}
export const Vehicles: React.FC = () => {
  const [vehicles,setVehicles]=useState<Array<TypeVehicles>>([])

  useEffect(()=>{
    axios.get<Array<TypeVehicles> >(`https://quiet-eyrie-82714.herokuapp.com/api/vehicles`)
    .then(res => {
      const getVehicles:Array<TypeVehicles> = res.data;
      setVehicles( getVehicles.map((element,index)=>({...element,key:`vehicles-list-item-${index}`}) ) );
    })
  },[]);
  return (
    <>
    <StyledUpperButtons>
    <Button type="primary">Nuevo Vehiculo</Button>
    </StyledUpperButtons>
    <Table rowSelection={{type:'radio'}} dataSource={vehicles} columns={columns} />
    <StyledBottomButtons>
    <Button type="dashed" disabled>Eliminar Vehiculo</Button>
    <Button type="dashed" disabled>Editar Vehiculo</Button>
    </StyledBottomButtons>
  </>
  );
}

const StyledUpperButtons = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 24px;
`
const StyledBottomButtons = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 24px;
  gap: 16px;
`