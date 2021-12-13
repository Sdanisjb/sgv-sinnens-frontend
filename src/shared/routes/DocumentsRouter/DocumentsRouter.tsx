import React from "react";
import { Route, useHistory } from "react-router-dom";
import { Sidebar } from "../../../components/Sidebar";
import { DocumentsProvider } from "../../../screens/Documents/shared/DocumentsContext/DocumentsContext";
import { Documents } from "../../../screens/Documents/Documents";
import AppSwitch from "../AppSwitch";
import { paths } from "../paths";
import { UpdateSoat } from "../../../screens/Documents/UpdateSoat/UpdateSoat";
import { UpdateItvMtc } from "../../../screens/Documents/UpdateItvMtc/UpdateItvMtc";
import { UpdateItvAutrisa } from "../../../screens/Documents/UpdateItvAutrisa/UpdateItvAutrisa";
import { UpdateMercancia } from "../../../screens/Documents/UpdateMercancia/UpdateMercancia";
import { useAuth } from "../../AuthContext/AuthContext";

export const DocumentsRouter: React.FC = () => {
  const { token } = useAuth();
  const history = useHistory();
  if (!token?.access_token) {
    history.push("/");
  }
  return (
    <AppSwitch>
      <Sidebar headerName="Actualizar Documentación">
        <DocumentsProvider>
          <Route exact path={paths.documents.default} component={Documents} />
          <Route exact path={paths.documents.soat} component={UpdateSoat} />
          <Route
            exact
            path={paths.documents.autrisa}
            component={UpdateItvAutrisa}
          />
          <Route
            exact
            path={paths.documents.mercancia}
            component={UpdateMercancia}
          />
          <Route exact path={paths.documents.mtc} component={UpdateItvMtc} />
        </DocumentsProvider>
      </Sidebar>
    </AppSwitch>
  );
};
