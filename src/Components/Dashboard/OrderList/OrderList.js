import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import TableSpinner from "../TableSpinner/TableSpinner";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the server
  useEffect(() => {
    axios
      .get(`http://localhost:9090/all-orders`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => toast.error(error.message));
  }, []);

  const handleStatusChange = (id, status) => {
    // Create a new array with modified orders
    const modifiedOrders = orders.map((order) => {
      if (order._id === id) {
        // Check if 'order' and 'order.order' are defined before accessing their properties
        if (order.order && order.order.name) {
          order.order.name = status;
        }
        order.status = status;
      }
      return order;
    });
    
    // Update the state with the modified orders
    setOrders(modifiedOrders);

    const modifiedStatus = { id, status };
    const loading = toast.loading("Updating....Please wait!");

    axios
      .patch("http://localhost:9090/update-order-status", modifiedStatus)
      .then((res) => {
        toast.dismiss(loading);
        if (res.data) {
          toast.success(`Set to ${status}`);
        }
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <Container>
      <div className="shadow p-5 bg-white" style={{ borderRadius: "15px" }}>
        {orders.length > 0 ? (
          <Table className="table-style" hover responsive>
            <thead className="bg-light">
              <tr>
                <th>Sl. No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Service</th>
                <th>Pay With</th>
                <th>Status</th>
              </tr>
            </thead>
            {orders.map((order, index) => {
              return (
                <tbody key={order._id} style={{ fontWeight: "500" }}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{order.order && order.order.name}</td>
                    <td>{order.paymentMethod}</td>
                    <td>
                      <select
                        className={
                          order.status === "Pending"
                            ? "btn btn-danger"
                            : order.status === "Done"
                            ? "btn btn-success"
                            : "btn btn-warning"
                        }
                        defaultValue={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        <option className="bg-white text-muted">Pending</option>
                        <option className="bg-white text-muted">On going</option>
                        <option className="bg-white text-muted">Done</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        ) : (
          <TableSpinner />
        )}
      </div>
    </Container>
  );
};

export default OrderList;
