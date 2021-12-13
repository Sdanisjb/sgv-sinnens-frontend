import React from "react";
import { Route, useHistory } from "react-router-dom";
import { Sidebar } from "../../../components/Sidebar";
import { CreateMaintenance } from "../../../screens/Maintenances/CreateMaintenance/CreateMaintenance";
import { DeleteMaintenance } from "../../../screens/Maintenances/DeleteMaintenance/DeleteVehicle";
import { Maintenances } from "../../../screens/Maintenances/Maintenances";
import { MaintenancesDetail } from "../../../screens/Maintenances/MaintenancesDetail/MaintenancesDetail";
import { MaintenancesProvider } from "../../../screens/Maintenances/shared/MaintenancesContext/MaintenancesContext";
import { UpdateMaintenance } from "../../../screens/Maintenances/UpdateMaintenance/UpdateMaintenance";
import { DeleteVehicle } from "../../../screens/Vehicles/DeleteVehicle/DeleteVehicle";
import { UpdateVehicle } from "../../../screens/Vehicles/UpdateVehicle/UpdateVehicle";
import { useAuth } from "../../AuthContext/AuthContext";
import AppSwitch from "../AppSwitch";
import { paths } from "../paths";

export const MaintenancesRouter: React.FC = () => {
  const { token } = useAuth();
  const history = useHistory();
  if (!token?.access_token) {
    history.push("/");
  }
  return (
    <AppSwitch>
      <MaintenancesProvider>
        <Sidebar headerName="Mantenimientos">
          <Route
            exact
            path={paths.maintenances.default}
            component={Maintenances}
          />
          <Route
            exact
            path={paths.maintenances.detail}
            component={MaintenancesDetail}
          />
          <Route
            exact
            path={paths.maintenances.create}
            component={CreateMaintenance}
          />
          <Route
            exact
            path={paths.maintenances.update}
            component={UpdateMaintenance}
          />
          <Route
            exact
            path={paths.maintenances.delete}
            component={DeleteMaintenance}
          />
        </Sidebar>
      </MaintenancesProvider>
    </AppSwitch>
  );
};
