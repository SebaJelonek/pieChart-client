import TableRows from './TableRows';

function ClientTable({ clientList, getData }) {
  const clientRows = clientList.map((client) => {
    return (
      <TableRows
        key={client.id === undefined ? Math.random() : client.id}
        id={client.id}
        title={client.title}
        value={client.value}
        getData={getData}
      />
    );
  });

  return (
    <div className='mt-5' style={{ width: '80%' }}>
      <table className='table table-scripted table-bordered text-center'>
        <thead>
          <tr>
            <th>Client</th>
            <th>Amount</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>{clientRows}</tbody>
      </table>
    </div>
  );
}
export default ClientTable;
