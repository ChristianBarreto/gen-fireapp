import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FetchTable from "./FetchTable";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import FetchSnackbar from "../FetchSnackbar";
import schema from "../../schema.json";
import { getList } from "../../api";

export default function ListPage() {
  const [data, setData] = useState({ data: [], pagination: { total: 0 } });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [snackData, setSnackData] = useState({ open: false, severity: 'info', text: '' });

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const resourceUrl = location?.pathname.split("/").slice(-1)[0];
  const resourceName = location?.pathname.split("/").slice(-1)[0];
  const resource = schema.find((res) => res.url === resourceUrl);

  useEffect(() => {
    setData({ data: [], pagination: { total: 0 } });
    setIsLoading(true);
    setIsError(false)
    const params = { deep: "1", ...Object.fromEntries(searchParams.entries()) };
    getList(resource?.resource, params).then((res) => {
      setData(res);
      setIsLoading(false);
      setIsError(false);
      setSnackData({ open: true, severity: 'info', text: 'Data loaded successfully.' });
    }).catch((err) => {
      setIsError(true);
      setIsLoading(false);
      setSnackData({ open: true, severity: 'error', text: 'Failed to load data.' });
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
        resourceName={resourceUrl}
      />
      <FetchSnackbar snackData={snackData} setSnackData={setSnackData} />
    </div>
  )
}