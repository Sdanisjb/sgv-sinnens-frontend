/* CU - 14 Actualizar SOAT*/
/* CU - 15 Actualizar ITV Autrisa*/
/* CU - 16 Actualizar ITV MTC*/
/* CU - 17 Actualizar Permiso de Transporte de Mercancía*/

/* 
Contexto de Documentacion
Implementacion de la clase controlador Documentacion
Atributos:
- documents
- documentSelected
Metodos:
- selectdocument
- createdocument
- updatedocument
- deletedocument
*/

import axios from "axios";
import moment from "moment";
import React from "react";
import {
  config,
  IDocuments,
  IDocumentsFromApi,
  IDocumentsToApi,
} from "../../../../shared/api";
import { useAuth } from "../../../../shared/AuthContext/AuthContext";

//import { User } from '../../shared/api'
//import { client } from '../../shared/client'

export interface DocumentsContextValue {
  documents: IDocuments[];
  documentSelected: IDocuments | undefined;
  createDocument: (documentsel: IDocumentsToApi) => void;
  updateSoat: (
    placa: string,
    fecha_renovacion: string | null,
    fecha_venc: string | null
  ) => void;
  updateItvMtc: (
    placa: string,
    fecha_renovacion: string | null,
    fecha_venc: string | null
  ) => void;
  updateItvAutrisa: (
    placa: string,
    fecha_renovacion: string | null,
    fecha_venc: string | null
  ) => void;
  updateMercancia: (
    placa: string,
    fecha_renovacion: string | null,
    fecha_venc: string | null
  ) => void;
  selectDocument: (documentsel: IDocuments | undefined) => void;
  loading: boolean;
  error: boolean;
}

const DocumentsContext = React.createContext<DocumentsContextValue | undefined>(
  undefined
);

const DocumentsProvider: React.FC = ({ children }) => {
  const [documents, setDocuments] = React.useState<IDocuments[]>([]);
  const [documentSelected, setDocumentSelected] = React.useState<
    IDocuments | undefined
  >();
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { token } = useAuth();

  React.useEffect(() => {
    async function getDocuments() {
      setLoading(true);
      try {
        axios
          .get<{ data: Array<IDocumentsFromApi> }>(
            `${config.url}vehicles_and_permissions`,
            {
              headers: {
                Authorization: `Bearer ${token?.access_token}`,
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
            const getDocuments: Array<IDocumentsFromApi> = res.data.data;
            setDocuments(
              getDocuments.map((element, index) => {
                const {
                  placa,
                  usuario,
                  tipo,
                  unidad,
                  anho,
                  permiso_autrisa,
                  permiso_mtc,
                  soat,
                  permiso_transp_mercancia,
                } = element;
                return {
                  key: `documents-list-item-${placa}`,
                  placa,
                  usuario,
                  tipo,
                  unidad,
                  anho,
                  permiso_autrisa_venc:
                    permiso_autrisa && permiso_autrisa.fecha_venc,
                  permiso_mtc_venc: permiso_mtc && permiso_mtc.fecha_venc,
                  soat_venc: soat && soat.fecha_venc,
                  permiso_transp_mercancia_venc:
                    permiso_transp_mercancia &&
                    permiso_transp_mercancia.fecha_venc,
                  permiso_autrisa_renovacion:
                    permiso_autrisa && permiso_autrisa.fecha_renovacion,
                  permiso_mtc_renovacion:
                    permiso_mtc && permiso_mtc.fecha_renovacion,
                  soat_renovacion: soat && soat.fecha_renovacion,
                  permiso_transp_mercancia_renovacion:
                    permiso_transp_mercancia &&
                    permiso_transp_mercancia.fecha_renovacion,
                };
              })
            );
          });
        setLoading(false);
      } catch (err: unknown) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    }
    getDocuments();
  }, [token]);

  const selectDocument = (document: IDocuments | undefined) => {
    setDocumentSelected(document);
  };

  const createDocument = (document: IDocumentsToApi) => {
    /*axios
      .post<IDocumentsFromApi>(
        `https://quiet-eyrie-82714.herokuapp.com/api/Documents`,
        Document
      )
      .then((res) => {
        const {
          placa,
          permiso_autrisa,
          permiso_mtc,
          soat,
          permiso_transp_mercancia,
        } = res.data;
        setDocuments([
          ...documents,
          {
            key: `documents-list-item-${placa}`,
            placa,
            permiso_autrisa,
            permiso_mtc,
            soat,
            permiso_transp_mercancia,
          },
        ]);
      });*/
  };

  const updateSoat = (
    placa: string,
    fecha_renovacion: string | null,
    fecha_venc: string | null
  ) => {
    if (documentSelected?.soat_venc || documentSelected?.soat_renovacion) {
      console.log("put");
      axios
        .put(
          `https://quiet-eyrie-82714.herokuapp.com/api/soat/${placa}`,
          {
            fecha_renovacion,
            fecha_venc,
          },
          {
            headers: {
              Authorization: `Bearer ${token?.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          setDocuments([
            ...documents.filter(
              (documentValue) => documentValue.placa !== placa
            ),
            {
              ...documentSelected,
              soat_renovacion: moment(fecha_renovacion).format("YYYY-MM-DD"),
              soat_venc: moment(fecha_venc).format("YYYY-MM-DD"),
            },
          ]);
          setDocumentSelected(undefined);
        });
    } else {
      axios
        .post(
          `https://quiet-eyrie-82714.herokuapp.com/api/vehicles/${placa}/soat`,
          { fecha_renovacion, fecha_venc },
          {
            headers: {
              Authorization: `Bearer ${token?.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setDocuments([
            ...documents.filter(
              (documentValue) => documentValue.placa !== placa
            ),
          ]);
          if (documentSelected)
            setDocuments([
              ...documents,
              {
                ...documentSelected,
                soat_renovacion: fecha_renovacion,
                soat_venc: fecha_venc,
              },
            ]);
          setDocumentSelected(undefined);
        });
    }
  };

  const updateItvMtc = (
    placa: string,
    fecha_renovacion: string | null,
    fecha_venc: string | null
  ) => {
    if (
      documentSelected?.permiso_mtc_venc ||
      documentSelected?.permiso_mtc_renovacion
    ) {
      console.log("put");
      axios
        .put(
          `https://quiet-eyrie-82714.herokuapp.com/api/permiso_mtc/${placa}`,
          {
            fecha_renovacion,
            fecha_venc,
          },
          {
            headers: {
              Authorization: `Bearer ${token?.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          setDocuments([
            ...documents.filter(
              (documentValue) => documentValue.placa !== placa
            ),
            {
              ...documentSelected,
              soat_renovacion: moment(fecha_renovacion).format("YYYY-MM-DD"),
              soat_venc: moment(fecha_venc).format("YYYY-MM-DD"),
            },
          ]);
          setDocumentSelected(undefined);
        });
    } else {
      console.log("post");
      axios
        .post(
          `https://quiet-eyrie-82714.herokuapp.com/api/vehicles/${placa}/permiso_mtc`,
          { fecha_renovacion, fecha_venc },
          {
            headers: {
              Authorization: `Bearer ${token?.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setDocuments([
            ...documents.filter(
              (documentValue) => documentValue.placa !== placa
            ),
          ]);
          if (documentSelected)
            setDocuments([
              ...documents,
              {
                ...documentSelected,
                soat_renovacion: moment(fecha_renovacion).format("YYYY-MM-DD"),
                soat_venc: moment(fecha_venc).format("YYYY-MM-DD"),
              },
            ]);
          setDocumentSelected(undefined);
        });
    }
  };

  const updateItvAutrisa = (
    placa: string,
    fecha_renovacion: string | null,
    fecha_venc: string | null
  ) => {
    if (
      documentSelected?.permiso_autrisa_venc ||
      documentSelected?.permiso_autrisa_renovacion
    ) {
      console.log("put");
      axios
        .put(
          `https://quiet-eyrie-82714.herokuapp.com/api/permiso_autrisa/${placa}`,
          {
            fecha_renovacion,
            fecha_venc,
          },
          {
            headers: {
              Authorization: `Bearer ${token?.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          setDocuments([
            ...documents.filter(
              (documentValue) => documentValue.placa !== placa
            ),
            {
              ...documentSelected,
              permiso_autrisa_renovacion:
                moment(fecha_renovacion).format("YYYY-MM-DD"),
              permiso_autrisa_venc: moment(fecha_venc).format("YYYY-MM-DD"),
            },
          ]);
          setDocumentSelected(undefined);
        });
    } else {
      axios
        .post(
          `https://quiet-eyrie-82714.herokuapp.com/api/vehicles/${placa}/permiso_autrisa`,
          { fecha_renovacion, fecha_venc },
          {
            headers: {
              Authorization: `Bearer ${token?.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setDocuments([
            ...documents.filter(
              (documentValue) => documentValue.placa !== placa
            ),
          ]);
          if (documentSelected)
            setDocuments([
              ...documents,
              {
                ...documentSelected,
                permiso_autrisa_renovacion:
                  moment(fecha_renovacion).format("YYYY-MM-DD"),
                permiso_autrisa_venc: moment(fecha_venc).format("YYYY-MM-DD"),
              },
            ]);
          setDocumentSelected(undefined);
        });
    }
  };
  const updateMercancia = (
    placa: string,
    fecha_renovacion: string | null,
    fecha_venc: string | null
  ) => {
    if (
      documentSelected?.permiso_transp_mercancia_venc ||
      documentSelected?.permiso_transp_mercancia_renovacion
    ) {
      console.log("put");
      axios
        .put(
          `https://quiet-eyrie-82714.herokuapp.com/api/permiso_transp_mercancia/${placa}`,
          {
            fecha_renovacion,
            fecha_venc,
          },
          {
            headers: {
              Authorization: `Bearer ${token?.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          setDocuments([
            ...documents.filter(
              (documentValue) => documentValue.placa !== placa
            ),
            {
              ...documentSelected,
              permiso_transp_mercancia_renovacion:
                moment(fecha_renovacion).format("YYYY-MM-DD"),
              permiso_transp_mercancia_venc:
                moment(fecha_venc).format("YYYY-MM-DD"),
            },
          ]);
          setDocumentSelected(undefined);
        });
    } else {
      axios
        .post(
          `https://quiet-eyrie-82714.herokuapp.com/api/vehicles/${placa}/permiso_transp_mercancia`,
          { fecha_renovacion, fecha_venc },
          {
            headers: {
              Authorization: `Bearer ${token?.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setDocuments([
            ...documents.filter(
              (documentValue) => documentValue.placa !== placa
            ),
          ]);
          if (documentSelected)
            setDocuments([
              ...documents,
              {
                ...documentSelected,
                permiso_transp_mercancia_renovacion:
                  moment(fecha_renovacion).format("YYYY-MM-DD"),
                permiso_transp_mercancia_venc:
                  moment(fecha_venc).format("YYYY-MM-DD"),
              },
            ]);
          setDocumentSelected(undefined);
        });
    }
  };

  return (
    <DocumentsContext.Provider
      value={{
        documents,
        error,
        loading,
        documentSelected,
        selectDocument,
        createDocument,
        updateSoat,
        updateItvMtc,
        updateItvAutrisa,
        updateMercancia,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};

function useDocuments(): DocumentsContextValue {
  const context = React.useContext(DocumentsContext);
  if (typeof context === "undefined") {
    throw Error("The context isn't defined");
  }
  return context;
}

export { DocumentsProvider, useDocuments, DocumentsContext };
