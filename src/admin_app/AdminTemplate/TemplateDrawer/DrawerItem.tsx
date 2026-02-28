import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import MailIcon from '@mui/icons-material/Mail';


export default function AdminDrawerItem({
  name,
  url,
}: {
  name: string
  url: string
}) {
  const navigate = useNavigate();
  
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => navigate(url)}>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  )
}