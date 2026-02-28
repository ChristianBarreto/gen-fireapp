import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FetchTable from "./FetchTable";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { addItem, deleteItem, editItem, getItem, getList } from "../../../db/firebaseIntegration.ts";
import { useUser } from "../../context/UserContext";
// import FetchModal from "../../organisms/FetchModal/index.tsx";
// import { TableButton } from "../../organisms/FetchTable/TableComponents/TableButton/index.tsx";
// import FetchSnackbar from "../../organisms/FetchSnackbar/index.tsx";
import schema from "../../schema.json";
import { getList } from "../../api";

export default function ListPage() {
  const [data, setData] = useState({ data: [], pagination: { total: 0 } });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const resourceUrl = location?.pathname.split("/").slice(-1)[0];
  const resourceName = location?.pathname.split("/").slice(-1)[0];
  const resource = schema.find((res) => res.url === resourceUrl);

  useEffect(() => {
    setIsLoading(true);
    const params = Object.fromEntries(searchParams.entries());
    getList(resource?.resource, params).then((res) => {
      setData(res);
      setIsLoading(false);
      setIsError(false);
    }).catch((err) => {
      setIsError(true);
      setIsLoading(false);
    })
  }, [resource.resource, searchParams]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={10}>
          <Typography variant="h4" gutterBottom>
            {resourceName.charAt(0).toUpperCase() + resourceName.slice(1)}
          </Typography>
        </Grid>
        <Grid size={2}>
          <Button
            variant="contained"
            onClick={() => navigate(`/admin/${resourceUrl}/add`)}
          >Add {resourceName}
          </Button>
        </Grid>
      </Grid>
      <FetchTable
        tableHeader={resource?.fields || []}
        data={data}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  )
}