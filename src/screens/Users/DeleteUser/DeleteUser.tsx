/* CU-05 Borrar Vehículo */
import React from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import { Modal } from "antd";
import { useUsers } from "../shared/UsersContext/UsersContext";

export const DeleteUser: React.FC = () => {
  const [modalIsVisible, setModalIsVisible] = React.useState(false);
  const { userSelected, selectUser, deleteUser, loading } = useUsers();
  const showModal = () => {
    setModalIsVisible(true);
  };
  const handleCancel = () => {
    selectUser(undefined);
    setModalIsVisible(false);
  };
  const handleOk = () => {
    if (userSelected) deleteUser(userSelected.id);
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
        <p>¿Estas seguro que quieres Eliminar el Usuario Seleccionado?</p>
      </Modal>
    </>
  );
};
