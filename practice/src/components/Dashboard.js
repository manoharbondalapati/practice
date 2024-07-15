import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/DataSlice';
import Loader from "react-js-loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer); 
    }
  }, [status]);

  const color = "#000000"; 

  return (
    <div>
      <Navbar />
      {(loading || status === 'loading') && (
        <div className={"item"}>
          <Loader type="spinner-cub" bgColor={color} color={color}  size={70} />
        </div>
      )}
      {status === 'succeeded' && !loading && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) =>
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {status === 'failed' && <p>{error}</p>}
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
