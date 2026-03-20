import Typography from "@mui/material/Typography"
import dayjs from "dayjs";

export default function FetchModalReadOnlyDataTime({
  item,
  input,
}: {
  item: any,
  input: any,
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