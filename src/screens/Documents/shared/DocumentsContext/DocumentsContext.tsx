/* CU - 14 Actualizar SOAT*/
/* CU - 15 Actualizar ITV Autrisa*/
/* CU - 16 Actualizar ITV MTC*/
/* CU - 17 Actualizar Permiso de Transporte de Mercancía*/
import axios from "axios";
import React from "react";
import {
  config,
  IDocuments,
  IDocumentsFromApi,
  IDocumentsToApi,
} from "../../../../shared/api";

//import { User } from '../../shared/api'
//import { client } from '../../shared/client'

export interface DocumentsContextValue {
  documents: IDocuments[];
  documentSelected: IDocuments | undefined;
  createDocument: (documentsel: IDocumentsToApi) => void;
  updateSoat: (
    placa: string,
    fecha_emision: string | null,
    fecha_venc: string | null
  ) => void;
  deleteDocument: (placa: string) => void;
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

  React.useEffect(() => {
    async function getDocuments() {
      setLoading(true);
      try {
        axios
          .get<{ data: Array<IDocumentsFromApi> }>(
            `${config.url}vehicles_and_permissions`
          )
          .then((res) => {
            const getDocuments: Array<IDocumentsFromApi> = res.data.data;
            console.log(getDocuments);
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
  }, []);

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
    fecha_emision: string | null,
    fecha_venc: string | null
  ) => {
    /*const sendDocument: IDocumentsToApi = {
      placa: document.placa,
      usuario: document.usuario,
      tipo: document.tipo,
      unidad: document.unidad,
      anho: document.anho,
      permiso_autrisa:
        document.permiso_autrisa_venc || document.permiso_autrisa_renovacion
          ? {
              fecha_renovacion: document.permiso_autrisa_renovacion,
              fecha_venc: document.permiso_autrisa_venc,
            }
          : null,
      permiso_mtc:
        document.permiso_mtc_venc || document.permiso_mtc_renovacion
          ? {
              fecha_renovacion: document.permiso_mtc_renovacion,
              fecha_venc: document.permiso_mtc_venc,
            }
          : null,
      soat:
        document.soat_venc || document.soat_renovacion
          ? {
              fecha_renovacion: document.soat_renovacion,
              fecha_venc: document.soat_venc,
            }
          : null,
      permiso_transp_mercancia:
        document.permiso_transp_mercancia_venc ||
        document.permiso_transp_mercancia_renovacion
          ? {
              fecha_renovacion: document.permiso_transp_mercancia_renovacion,
              fecha_venc: document.permiso_transp_mercancia_venc,
            }
          : null,
    };*/
    const config = {
      headers: {
        Accept: "application/json",
      },
    };
    if (documentSelected?.soat_venc || documentSelected?.soat_renovacion) {
      axios
        .put(
          `https://quiet-eyrie-82714.herokuapp.com/api/soat/${placa}/`,
          {
            fecha_emision,
            fecha_venc,
          },
          config
        )
        .then((res) => {
          setDocuments([
            ...documents.filter(
              (documentValue) => documentValue.placa !== placa
            ),
            {
              ...documentSelected,
              soat_renovacion: fecha_emision,
              soat_venc: fecha_venc,
            },
          ]);
          setDocumentSelected(undefined);
        });
    } else {
      axios
        .post(
          `https://quiet-eyrie-82714.herokuapp.com/api/vehicles/${placa}/soat`,
          { fecha_emision, fecha_venc },
          config
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
                soat_renovacion: fecha_emision,
                soat_venc: fecha_venc,
              },
            ]);
          setDocumentSelected(undefined);
        });
    }
  };
  const deleteDocument = (placa: string) => {
    /*setLoading(true);
    try {
      axios.delete(
        `https://quiet-eyrie-82714.herokuapp.com/api/Documents/${placa}`
      );
      setLoading(false);
      setDocuments(
        documents.filter((documentValue) => documentValue.placa !== placa)
      );
      setDocumentSelected(undefined);
    } catch (err: unknown) {
      console.error(err);
      setError(true);
      setLoading(false);
      setDocumentSelected(undefined);
    }*/
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
        deleteDocument,
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
