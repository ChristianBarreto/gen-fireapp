import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import schema from "../../schema.json";

import { Backdrop, Box, Button, CircularProgress, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { addItem, editItemById, getItemById, deleteItemById } from '../../api';
import FieldText from './FieldText';
import ReadOnlyDataTime from './ReadOnlyDataTime';
import FieldReadOnly from './FieldReadOnly';
import FieldLongText from './FieldLongText';
import FieldSelect from './FieldSelect';
import FieldFkSelect from './FieldFkSelect';
import dayjs from 'dayjs';

export default function AddEditPage() {
  const [item, setItem] = useState<any>({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const pathParts = location?.pathname.split("/");
  const lastSegment = pathParts.slice(-1)[0];
  const pageMode = lastSegment === "add" ? "add" : "edit";
  const resourceUrl = pageMode === "add" ? pathParts.slice(-2)[0] : pathParts.slice(-2)[0];
  const resourceName = resourceUrl;
  const resource = schema.find((res) => res.url === resourceUrl);

  useEffect(() => {
    if (pageMode === "edit" && id) {
      getItemById(resource?.resource as string, id).then((res) => {
        setItem(res);
        setIsLoading(false);
        setIsError(false);
      }).catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleChange = (e: any) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    if (pageMode === "add") {
      addItem(resource?.resource as string, item).then((res) => {
        navigate(-1)
      }).catch((err) => {
        console.log(err);
      });
    } else if (pageMode === "edit") {
      editItemById(resource?.resource as string, item.id, item).then((res) => {
        navigate(-1)
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  const handleDelete = () => {
    if (pageMode === "edit" && id) {
      deleteItemById(resource?.resource as string, id).then((res) => {
        setOpenDeleteModal(false);
        navigate(-1);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  console.log("Item: ", item);
  return (
    <div>
      <Backdrop open={isLoading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <CircularProgress color="inherit" />
          <Typography variant="body2">Loading…</Typography>
        </Box>
      </Backdrop>
      <Typography variant="h4" gutterBottom>
        {pageMode.charAt(0).toUpperCase() + pageMode.slice(1)} {resourceName.charAt(0).toUpperCase() + resourceName.slice(1)}
      </Typography>
      <form>
        {resource?.fields.map((field) => (
          <Fragment key={`${field?.field}`}>
            {field.type === "text" && <FieldText item={item} input={field} handleChange={handleChange} />}
            {field.type === "number" && <FieldText item={item} input={field} handleChange={handleChange} />}
            {field.type === "long-text" && <FieldLongText item={item} input={field} handleChange={handleChange} />}
            {field.type === "select" && <FieldSelect item={item} input={field} handleChange={handleChange} />}
            {field.type === "fk" && <FieldFkSelect item={item} field={field} handleChange={handleChange} />}
            {field.type === "caption" && <FieldReadOnly item={field} input={field} handleChange={handleChange} />}
            {/* {field.type === "captionDateTime" && <ReadOnlyDataTime item={field} input={field} handleChange={handleChange} />} */}
          </Fragment>
        ))}
      </form>
      <Button variant="outlined" sx={{ ml: 2, mr: 2 }} onClick={() => navigate(-1)}>Cancel</Button>
      <Button color="info" variant="contained" sx={{ ml: 2, mr: 2 }} onClick={handleSubmit}>
        Submit
      </Button>
      {pageMode === "edit" && (
        <Button color="error" variant="contained" sx={{ ml: 2, mr: 2 }} onClick={() => setOpenDeleteModal(true)}>
          Delete
        </Button>
      )}
      {pageMode === "edit" && (
        <div style={{ marginTop: "16px" }}>
          <Typography variant="body2">Created on {dayjs(item.timestamp).format("YYYY-MM-DD HH:mm:ss")}</Typography>
          <Typography variant="body2">Last updated on {dayjs(item.lastUpdated).format("YYYY-MM-DD HH:mm:ss")}</Typography>
        </div>
      )}

      <Dialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}