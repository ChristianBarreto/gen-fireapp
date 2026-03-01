import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import schema from "../../schema.json";
import FetchModalText from './FetchModalText';
import FetchModalSelect from './FetchModalSelect';
import FetchModalFkSelect from './FetchModalFkSelect';
import FetchModalReadOnly from './FetchModalReadOnly';
import FetchModalFk from './FetchModalFk';
import FetchModalReadOnlyDataTime from './FetchModalReadOnlyDataTime';
import { Button } from '@mui/material';
import { addItem, editItemById, getItemById } from '../../api';

export default function AddEditPage() {
  const [item, setItem] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
      getItemById(resource?.resource, id).then((res) => {
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

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    if (pageMode === "add") {
      addItem(resource?.resource, item).then((res) => {
        navigate(-1)
      }).catch((err) => {
        console.log(err);
      });
    } else if (pageMode === "edit") {
      // editItemById(item.id, item);
    }
  }

  console.log(">>>> Item: ", item);
  return (
    <div>
      {pageMode} {resourceName}
      <form>
        {resource?.fields.map((field) => (
          <Fragment key={`${field?.field}`}>
            {field.type === "text" && <FetchModalText item={item} input={field} handleChange={handleChange} />}
            {field.type === "number" && <FetchModalText item={item} input={field} handleChange={handleChange} />}
            {field.type === "select" && <FetchModalSelect item={item} input={field} handleChange={handleChange} />}
            {field.type === "fk" && <FetchModalFkSelect item={item} field={field} handleChange={handleChange} />}
            {field.type === "caption" && <FetchModalReadOnly item={field} input={field} handleChange={handleChange} />}
            {/* {field.type === "fk" && <FetchModalFk item={field} input={field} handleChange={handleChange}/>} */}
            {field.type === "captionDateTime" && <FetchModalReadOnlyDataTime item={field} input={field} handleChange={handleChange} />}
          </Fragment>
        ))}
      </form>
      <Button onClick={() => navigate(-1)}>Cancel</Button>
      <Button color="info" variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}