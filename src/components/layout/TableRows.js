import { useState } from 'react';
import axios from 'axios';

function TableRows({ title, value, id, getData }) {
  const [editable, setEditable] = useState(false);
  const [newValue, setNewValue] = useState(value);

  function onEditHandler() {
    setEditable(true);
  }

  async function onDeleteHandler() {
    const res = await axios.delete(`http://localhost:8000/api/remove/${id}`);
    if (res.status === 200) {
      console.log(res.message);
      getData();
    }
  }

  async function onSaveHandler() {
    setEditable(false);
    const res = await axios.put(`http://localhost:8000/api/edit/${id}`, {
      value: newValue,
    });
    if (res.status === 200) {
      console.log(res.data.message);
      getData();
    }
  }

  function newValueHandler(e) {
    setNewValue(parseInt(e.target.value));
  }

  return (
    <tr>
      <td>{title}</td>
      {editable ? (
        <td style={{ width: '156.85px', height: '26px' }}>
          <input
            type='number'
            className='text-center'
            style={{ width: '54.5px', height: '24px' }}
            value={newValue}
            onChange={newValueHandler}
          />
        </td>
      ) : (
        <td style={{ width: '156.85px', height: '26px' }}>{newValue}</td>
      )}
      {editable ? (
        <td onClick={onSaveHandler} style={{ width: '90px' }}>
          <div
            className='btn btn-success'
            style={{ cursor: 'pointer', padding: '0px 3px' }}
          >
            Save
          </div>
        </td>
      ) : (
        <td onClick={onEditHandler} style={{ width: '90px' }}>
          <div
            className='btn btn-success'
            style={{ cursor: 'pointer', padding: '0px 3px' }}
          >
            Edit
          </div>
        </td>
      )}
      <td>
        <div
          className='btn btn-danger'
          style={{ cursor: 'pointer', padding: '0px 3px' }}
          onClick={onDeleteHandler}
        >
          Delete
        </div>
      </td>
    </tr>
  );
}
export default TableRows;
