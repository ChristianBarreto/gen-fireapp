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
     <TextField
        autoFocus
        required
        margin="dense"
        id={input.id}
        name={input.field}
        label={input.name}
        type={input.type}
        value={item[input.name]}
        onChange={(e) => handleChange(e)}
        disabled={ input.readOnly ? true : false}
        slotProps={{
          input: {
            readOnly: input.readOnly ? true : false,
          },
        }}
      />
  )
}