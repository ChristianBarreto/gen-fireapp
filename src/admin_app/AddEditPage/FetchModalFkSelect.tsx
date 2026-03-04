import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (field.type === "fk") {
      getList(field.field, { deep: 0 }).then((res) => {
        setOptions(res.data.map((item) => ({ id: item.id, value: item.id, label: item[field.fkField] })));
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div id={field.field}>
      <br /><br />
      <FormControl fullWidth disabled={isLoading || (field.readOnly ? true : false)}>
        <InputLabel id={`${field.field}-label`}>{field.name}</InputLabel>
        <Select
          labelId={`${field.field}-label`}
          id={field.field}
          name={field.field}
          value={options.length > 0 ? (item[field.field] ?? "") : ""}
          label={field.name}
          onChange={(e) => handleChange(e)}
          endAdornment={
            isLoading ? (
              <InputAdornment position="end" sx={{ mr: 2 }}>
                <CircularProgress size={18} />
              </InputAdornment>
            ) : undefined
          }
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