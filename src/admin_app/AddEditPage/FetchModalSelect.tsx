import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";

export default function FetchModalSelect({
  item,
  input,
  handleChange,
}: {
  item: any,
  input: any,
  handleChange: (data: string) => void
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (input.options && input.options.length >= 0) {
      setIsLoading(false);
    }
  }, [input.options]);

  return (
    <div id={input.id}>
      <br /><br />
      <FormControl fullWidth disabled={isLoading || (input.readOnly ? true : false)}>
        <InputLabel id={`${input.id}-label`}>{input.label}</InputLabel>
        <Select
          labelId={`${input.id}-label`}
          id={input.id}
          name={input.name}
          value={item[input.name] ?? ""}
          label={input.label}
          onChange={(e) => handleChange(e)}
          endAdornment={
            isLoading ? (
              <InputAdornment position="end" sx={{ mr: 2 }}>
                <CircularProgress size={18} />
              </InputAdornment>
            ) : undefined
          }
        >
          {input.options?.map((option) => (
            <MenuItem key={option.id} id={option.id} value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br /><br />
    </div>
  )
}