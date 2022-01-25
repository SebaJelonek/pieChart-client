import { useState, useEffect } from 'react';
import axios from 'axios';
import ClientTable from './ClientTable';
import MyChart from './MyChart';

function ClientForm() {
  const [clientName, setClientName] = useState('');
  const [clientAmount, setClientAmount] = useState(Number);
  const [colorNumber, setColorNumber] = useState(0);
  const [clientList, setClientList] = useState([]);

  const getData = async () => {
    const res = await axios.get('http://localhost:8000/api/companies');
    setClientList(res.data.companyData);
    setColorNumber(res.data.companyData.length);
  };

  useEffect(() => {
    getData();
  }, []);

  const colorList = [
    '#188038',
    '#FFD814',
    '#e50914',
    '#1B74E4',
    '#F8A400',
    '#CCCCCF',
    '#0639A6',
    '#790047',
    '#00A56F',
    '#5305A8',
    '#F85400',
    '#0AC900',
    '#FE0006',
    '#2E07AB',
    '#A50004',
    '#C0C0BD',
    '#FFBA40',
  ];

  function clientNameHandler(e) {
    setClientName(e.target.value);
  }

  function clientNumberHandler(e) {
    setClientAmount(e.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    setClientList((prevState) => [
      ...prevState,
      {
        title: clientName,
        value: parseInt(clientAmount),
        color: colorList[colorNumber],
      },
    ]);
    if (colorNumber >= 16) {
      setColorNumber(0);
    } else {
      setColorNumber(colorNumber + 1);
    }

    const dataPost = async () => {
      const res = await axios.post('http://localhost:8000/api/add-company', {
        title: clientName,
        value: clientAmount,
        color: colorList[colorNumber],
      });

      if (res.data.status === 200) {
        console.log(res.data.message);
      }
    };
    dataPost();
    setClientAmount('');
    setClientName('');
  }

  return (
    <div>
      <div className='container mb-3 mt-3'>
        <form onSubmit={submitHandler}>
          <label
            className='text-center fs-5'
            style={{ width: '100%' }}
            htmlFor='client'
          >
            Client/Company Name
          </label>
          <input
            className='form-control'
            type='text'
            name='client'
            id='client'
            value={clientName}
            onChange={clientNameHandler}
            required
          />
          <label
            className='text-center fs-5'
            style={{ width: '100%' }}
            htmlFor='client-number'
          >
            Amount
          </label>
          <input
            className='form-control mb-3'
            type='number'
            name='client-number'
            id='client-number'
            value={clientAmount}
            onChange={clientNumberHandler}
            min={1}
            required
          />
          <button
            className='btn btn-primary fs-4'
            style={{ width: '100%', color: 'black', fontWeight: 500 }}
            type='submit'
          >
            Add
          </button>
        </form>
      </div>
      <div className='container mt-5' style={{ display: 'flex' }}>
        <ClientTable
          style={{ width: 50 + '%' }}
          clientList={clientList}
          getData={getData}
        />
        <MyChart clientList={clientList} />
      </div>
    </div>
  );
}
export default ClientForm;
