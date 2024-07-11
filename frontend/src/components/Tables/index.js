import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { api } from '../../contexts/api';

export function Tabela() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/student/get-students');
      console.log(response);
      setData(response.data);
    }
    fetchData();
  }, []);

  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.nameResp}</td>
            <td>{item.username}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

