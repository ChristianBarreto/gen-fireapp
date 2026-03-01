import { InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function FetchModalText({
  item,
  input,
  handleChange,
}: {
  item: any,
  input: any,
  handleChange: (data: string) => void
}) {

  return (
    <>
      <InputLabel id={`${input.field}-label`}>{input.name}</InputLabel>
      <TextField
          autoFocus
          required
          margin="dense"
          id={input.id}
          name={input.field}
          type={input.type}
          value={item[input.field]}
          onChange={(e) => handleChange(e)}
          disabled={ input.readOnly ? true : false}
          slotProps={{
            input: {
              readOnly: input.readOnly ? true : false,
            },
          }}
        />
    </>
  )
}