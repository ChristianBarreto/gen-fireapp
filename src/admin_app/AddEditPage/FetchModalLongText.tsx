import { InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function FetchModalLongText({
  item,
  input,
  handleChange,
}: {
  item: any,
  input: any,
  handleChange: (data: any) => void
}) {
  return (
    <>
      <InputLabel id={`${input.field}-label`}>{input.name}</InputLabel>
      <TextField
        required
        multiline
        rows={4}
        margin="dense"
        id={input.id}
        name={input.field}
        value={item[input.field] ?? ''}
        onChange={(e) => handleChange(e)}
        fullWidth
      />
    </>
  );
}
