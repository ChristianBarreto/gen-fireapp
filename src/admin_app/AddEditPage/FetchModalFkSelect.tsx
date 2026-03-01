import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { getList } from "../../api";

export default function FetchModalFkSelect({
  field,
  item,
  handleChange,
}: {
  field: any,
  item: any,
  handleChange: (data: string) => void
}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (field.type === "fk") {
      getList(field.field, { deep: 0 }).then((res) => {
        setOptions(res.data.map((item) => ({ id: item.id, value: item.id, label: item[field.fkField] })));
      })
    }
  }, []);

  return (
    <div id={field.field}>
      <br /><br />
      <FormControl fullWidth disabled={field.readOnly ? true : false}>
        <InputLabel id={`${field.field}-label`}>{field.name}</InputLabel>
        <Select
          labelId={`${field.field}-label`}
          id={field.field}
          name={field.field}
          value={options.length > 0 ? (item[field.field] ?? "") : ""}
          label={field.name}
          onChange={(e) => handleChange(e)}
        >
          {field.nullable && <MenuItem value=""><em>None</em></MenuItem>}
          {options?.map((option) => (
            <MenuItem key={option.id} id={option.id} value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br /><br />
    </div>
  )
}