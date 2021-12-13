import React from "react";
import { Route } from "react-router-dom";
import { Sidebar } from "../../../components/Sidebar";
import { CreateVehicle } from "../../../screens/Vehicles/CreateVehicle/CreateVehicle";
import { DeleteVehicle } from "../../../screens/Vehicles/DeleteVehicle/DeleteVehicle";
import { UpdateVehicle } from "../../../screens/Vehicles/UpdateVehicle/UpdateVehicle";
import { Vehicles } from "../../../screens/Vehicles/Vehicles";
import AppSwitch from "../AppSwitch";
import { paths } from "../paths";

export const VehiclesRouter: React.FC = () => {
  return (
    <AppSwitch>
      <Sidebar headerName="Vehículos">
        <Route exact path={paths.vehicles.default} component={Vehicles} />
        <Route exact path={paths.vehicles.create} component={CreateVehicle} />
        <Route exact path={paths.vehicles.update} component={UpdateVehicle} />
        <Route exact path={paths.vehicles.delete} component={DeleteVehicle} />
      </Sidebar>
    </AppSwitch>
  );
};
