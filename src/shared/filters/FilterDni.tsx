/* 
Componente FilterDni
Componente de renderizado para ser usado como filtro para columnas de tipo numerico dentro de una tabla
Acepta todos los parametros/props descritos en FilterDropdownProps
Retorna un renderizado de box con un search input
*/

import { Button, Divider, InputNumber } from "antd";
import "antd/dist/antd.css";
import { FilterDropdownProps } from "antd/lib/table/interface";

const FilterDni: React.FC<FilterDropdownProps> = ({
  setSelectedKeys,
  selectedKeys,
  clearFilters,
  confirm,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingTop: "16px",
        paddingBottom: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: "0px 16px",
        }}
      >
        <InputNumber
          placeholder="Buscar"
          maxLength={8}
          value={selectedKeys[0] || undefined}
          onChange={(e) => {
            setSelectedKeys(e ? [e.toString()] : []);
          }}
        />
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "0px 8px",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          type="text"
          onClick={() => {
            if (clearFilters) clearFilters();
            setTimeout(() => confirm(), 200);
          }}
        >
          Reset
        </Button>
        <Button size="small" type="primary" onClick={() => confirm()}>
          OK
        </Button>
      </div>
    </div>
  );
};

export default FilterDni;
