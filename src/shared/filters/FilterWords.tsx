/* 
Componente FilterWords
Componente de renderizado para ser usado como filtro para columnas dentro de una tabla
Acepta todos los parametros/props descritos en FilterDropdownProps
Retorna un renderizado de box con un search input
*/

import { Button, Divider, Input } from "antd";
import "antd/dist/antd.css";

import { FilterDropdownProps } from "antd/lib/table/interface";

const FilterWords: React.FC<FilterDropdownProps> = ({
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
        <Input
          placeholder="Buscar"
          value={selectedKeys[0] || undefined}
          onChange={(e) => {
            setSelectedKeys(
              e.currentTarget.value ? [e.currentTarget.value] : []
            );
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

export default FilterWords;
