/* CU-05 Borrar Vehículo */
import React from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import { Modal } from "antd";
import { useVehicles } from "../shared/VehiclesContext/VehiclesContext";

export const DeleteVehicle: React.FC = () => {
  const [modalIsVisible, setModalIsVisible] = React.useState(false);
  const { vehicleSelected, selectVehicle, deleteVehicle, loading } =
    useVehicles();
  const showModal = () => {
    setModalIsVisible(true);
  };
  const handleCancel = () => {
    selectVehicle(undefined);
    setModalIsVisible(false);
  };
  const handleOk = () => {
    if (vehicleSelected) deleteVehicle(vehicleSelected.id);
    setModalIsVisible(false);
  };
  return (
    <>
      <Button type="default" onClick={showModal}>
        Eliminar Vehiculo
      </Button>
      <Modal
        visible={modalIsVisible}
        title="Eliminar Vehiculo"
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Sí
          </Button>,
        ]}
      >
        <p>¿Estas seguro que quieres Eliminar el Vehiculo Seleccionado?</p>
      </Modal>
    </>
  );
};
