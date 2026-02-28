import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { getList } from "../../../db/firebaseIntegration";

export default function FetchSelect({
  item,
  input,
  handleChange,
}: {
  item: any,
  input: any,
  handleChange: (data: string) => void
}) {
  
  return (
     <div id={input.id}>
      <br /><br />
      <FormControl fullWidth disabled={input.readOnly ? true : false}>
        <InputLabel id={`${input.id}-label`}>{input.label}</InputLabel>
        <Select
          labelId={`${input.id}-label`}
          id={input.id}
          name={input.name}
          value={item[input.name]}
          label={input.label}
          onChange={(e) => handleChange(e)}
        >
          {input.options?.map((option) => (
            <MenuItem id={option.id} value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br /><br />
    </div>
  )
}