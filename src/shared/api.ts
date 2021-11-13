export type IVehiclesFromApi = {
  id: number;
  placa: string;
  categoria: string;
  usuario: string;
  unidad: string;
  marca: string;
  anho: number;
  createdAt: string;
  updatedAt: string;
};

export type IVehicles = {
  key: string;
  id: number;
  placa: string;
  categoria: string;
  usuario: string;
  unidad: string;
  marca: string;
  anho: number;
};

export type IVehiclesToApi = {
  placa: string;
  categoria: string;
  usuario: string;
  unidad: string;
  marca: string;
  anho: number;
};

export type IUsersFromApi = {
  id: number;
  placa: string;
  categoria: string;
  usuario: string;
  unidad: string;
  marca: string;
  anho: number;
  createdAt: string;
  updatedAt: string;
};

export type IUsers = {
  key: string;
  id: number;
  placa: string;
  categoria: string;
  usuario: string;
  unidad: string;
  marca: string;
  anho: number;
};

export type IUsersToApi = {
  placa: string;
  categoria: string;
  usuario: string;
  unidad: string;
  marca: string;
  anho: number;
};
