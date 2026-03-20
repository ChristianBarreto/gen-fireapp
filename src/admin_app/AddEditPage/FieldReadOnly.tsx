import Typography from "@mui/material/Typography"

export default function FetchModalReadOnly({
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
        {typeof item[input.name] === "string"  && (<>{input.label} {item[input.name]}</>)}
      </Typography>
    </div>
  )
}