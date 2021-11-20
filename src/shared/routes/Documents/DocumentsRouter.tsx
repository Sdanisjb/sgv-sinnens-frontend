import React from "react";
import { Route } from "react-router-dom";
import { Sidebar } from "../../../components/Sidebar";
import { DocumentsProvider } from "../../../screens/Documents/shared/DocumentsContext/DocumentsContext";
import { Documents } from "../../../screens/Documents/Documents";
import AppSwitch from "../AppSwitch";
import { paths } from "../paths";
import { UpdateSoat } from "../../../screens/Documents/UpdateSoat/UpdateSoat";

export const DocumentsRouter: React.FC = () => {
  return (
    <AppSwitch>
      <Sidebar headerName="Actualizar Documentación">
        <DocumentsProvider>
          <Route exact path={paths.documents.default} component={Documents} />
          <Route exact path={paths.documents.soat} component={UpdateSoat} />
          <Route exact path={paths.documents.autrisa} component={UpdateSoat} />
          <Route
            exact
            path={paths.documents.mercancia}
            component={UpdateSoat}
          />
          <Route exact path={paths.documents.mtc} component={UpdateSoat} />
        </DocumentsProvider>
      </Sidebar>
    </AppSwitch>
  );
};
