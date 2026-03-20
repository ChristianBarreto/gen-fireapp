import IconButton from "@mui/material/IconButton"
import { useRef } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


export const TableButton = ({
  type,
  onClickEvent,
  color,
}: {
  type: string,
  onClickEvent?: (value: string) => void,
  color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    if (buttonRef.current?.parentElement && onClickEvent){
      onClickEvent(buttonRef.current?.parentElement?.className)
    }
  }

  return (
    <IconButton color={color} size="small" onClick={handleClick} ref={buttonRef}>
      {type === "edit" && <EditIcon />}
      {type === "delete" && <DeleteIcon />}
    </IconButton>
  )
}