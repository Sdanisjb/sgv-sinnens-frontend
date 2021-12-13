import React from "react";
import { Route, useHistory } from "react-router-dom";
import { VehiclesProvider } from "../../../screens/Vehicles/shared/VehiclesContext/VehiclesContext";
import { Vehicles } from "../../../screens/Vehicles/Vehicles";
import { useAuth } from "../../AuthContext/AuthContext";
import AppSwitch from "../AppSwitch";
import { MaintenancesRouter } from "../MaintenancesRouter";
import { paths } from "../paths";
import { VehiclesRouter } from "../VehiclesRouter";

export const VehiclesMaintenancesRouter: React.FC = () => {
  const { token } = useAuth();
  const history = useHistory();
  if (!token?.access_token) {
    history.push("/");
  }
  return (
    <AppSwitch>
      <VehiclesProvider>
        <Route path={paths.vehicles.default} component={VehiclesRouter} />
        <Route
          path={paths.maintenances.default}
          component={MaintenancesRouter}
        />
      </VehiclesProvider>
    </AppSwitch>
  );
};
