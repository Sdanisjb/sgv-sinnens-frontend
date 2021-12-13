/* CU-05 Borrar Vehículo */
import React from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import { Modal } from "antd";
import { useMaintenances } from "../shared/MaintenancesContext/MaintenancesContext";

export const DeleteMaintenance: React.FC = () => {
  const [modalIsVisible, setModalIsVisible] = React.useState(false);
  const { maintenanceSelected, selectMaintenance, deleteMaintenance, loading } =
    useMaintenances();
  const showModal = () => {
    setModalIsVisible(true);
  };
  const handleCancel = () => {
    selectMaintenance(undefined);
    setModalIsVisible(false);
  };
  const handleOk = () => {
    if (maintenanceSelected) deleteMaintenance(maintenanceSelected.id);
    setModalIsVisible(false);
  };
  return (
    <>
      <Button type="default" onClick={showModal}>
        Eliminar Registro
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
        <p>
          ¿Estas seguro que quieres Eliminar el Registro de Mantenimiento
          Seleccionado?
        </p>
      </Modal>
    </>
  );
};
