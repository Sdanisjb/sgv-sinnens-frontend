export const config = {
  url: "https://quiet-eyrie-82714.herokuapp.com/api/",
};

export type IVehiclesFromApi = {
  placa: string;
  tipo: string;
  usuario: string;
  unidad: string;
  marca: string;
  anho: number;
  createdAt: string;
  updatedAt: string;
};

export type IVehicles = {
  key: string;
  placa: string;
  tipo: string;
  usuario: string;
  unidad: string;
  marca: string;
  anho: number;
};

export type IVehiclesToApi = {
  placa: string;
  tipo: string;
  usuario: string;
  unidad: string;
  marca: string;
  anho: number;
};

export type IUsersFromApi = {
  DNI: number;
  nombres: string;
  apellidos: string;
  email: string;
  email_verified_at: string | null;
  createdAt: string;
  updatedAt: string;
};

export type IUsers = {
  key: string;
  DNI: number;
  nombres: string;
  apellidos: string;
  email: string;
};

export type IUsersToApi = {
  DNI: number;
  nombres: string;
  apellidos: string;
  email: string;
};

type IPermisoAutrisa = {
  fecha_renovacion: string | null;
  fecha_venc: string | null;
} | null;
type IPermisoMTC = {
  fecha_renovacion: string | null;
  fecha_venc: string | null;
} | null;
type ISoat = {
  fecha_renovacion: string | null;
  fecha_venc: string | null;
} | null;
type IPermisoMercancia = {
  fecha_renovacion: string | null;
  fecha_venc: string | null;
} | null;

export type IDocumentsFromApi = {
  placa: string;
  usuario: string;
  tipo: string;
  unidad: string;
  anho: number;
  permiso_autrisa: IPermisoAutrisa;
  permiso_mtc: IPermisoMTC;
  soat: ISoat;
  permiso_transp_mercancia: IPermisoMercancia;
};

export type IDocuments = {
  key: string;
  placa: string;
  usuario: string;
  tipo: string;
  unidad: string;
  anho: number;
  permiso_autrisa_venc: string | null;
  permiso_autrisa_renovacion: string | null;
  permiso_mtc_venc: string | null;
  permiso_mtc_renovacion: string | null;
  soat_venc: string | null;
  soat_renovacion: string | null;
  permiso_transp_mercancia_venc: string | null;
  permiso_transp_mercancia_renovacion: string | null;
};

export type IDocumentsToApi = {
  placa: string;
  usuario: string;
  tipo: string;
  unidad: string;
  anho: number;
  permiso_autrisa: IPermisoAutrisa;
  permiso_mtc: IPermisoMTC;
  soat: ISoat;
  permiso_transp_mercancia: IPermisoMercancia;
};
