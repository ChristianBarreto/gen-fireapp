import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function AdminDrawerItem({
  name,
  url,
}: {
  name: string
  url: string 
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === url

  return (
    <ListItem disablePadding>
      <ListItemButton selected={isActive} onClick={() => navigate(url)}>
        <ListItemIcon>
          <ArrowForwardIosIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  )
}