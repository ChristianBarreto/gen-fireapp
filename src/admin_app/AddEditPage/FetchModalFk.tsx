import Typography from "@mui/material/Typography"

export default function FetchModalFk({
  item,
  input,
  handleChange,
}: {
  item: any,
  input: any,
  handleChange: (data: string) => void
}) {

  return (
    <div>
      <Typography variant="caption" color="gray">
        {input.label} {item[input.name][input.fk]}
      </Typography>
    </div>
  )
}