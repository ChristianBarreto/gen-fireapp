import Typography from "@mui/material/Typography"
import dayjs from "dayjs";

export default function FetchModalReadOnlyDataTime({
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
      <Typography
        variant="caption"
        color="gray"
      >
        {input.label} {dayjs(item[input.name]).format('DD/MM/YYYY HH:mm:ss')}
      </Typography>
    </div>
  )
}