import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { UserContext } from "../../../App";
import TableSpinner from "../TableSpinner/TableSpinner";

const ManageService = () => {
  // Access the user's email from the context
  const {
    loggedInUser: { email },
  } = useContext(UserContext);

  // State to store the services data
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch services data from the API when the component mounts
    axios
      .get("http://localhost:9090/all-services")
      .then((res) => {
        setServices(res.data);
      })
      .catch((error) => toast.error(error.message));
  }, []);

  // Function to check if the user has permission to perform certain actions
  const restrictPermission = (id) => {
    let matchedID = false;

    // Iterate through services to find a match
    for (let i = 0; i < services.length; i++) {
      if (services[i] && services[i]._id === id) {
        matchedID = true;
        break; // Exit the loop since we found a match
      }
    }

    // Check if the user has permission based on email and matchedID
    if (email === "demo@admin.com" && matchedID) {
      return true; // User has permission
    }
    return false; // User does not have permission
  };

  // Handle updating a service
  const handleUpdateService = (id) => {
    if (restrictPermission(id)) {
      return swal(
        "Permission restriction!",
        "As a test-admin, you don't have permission to update 6 core services. But you can update your added services.",
        "info"
      );
    } else {
      return swal(
        "Permission restriction!",
        "This feature will be coming soon...",
        "info"
      );
    }
  };

  // Handle deleting a service
  const handleDeleteService = (id) => {
    if (restrictPermission(id)) {
      return swal(
        "Permission restriction!",
        "As a test-admin, you don't have permission to delete 6 core services. But you can delete your added services.",
        "info"
      );
    }

    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this service?",
      icon: "warning",
      buttons: [true, "Yes"],
      dangerMode: true,
    }).then((wantDelete) => {
      if (wantDelete) {
        const loading = toast.loading("Deleting...Please wait!");

        // Create a new array of services without the deleted one
        const removedServices = services.filter((item) => item._id !== id);

        // Send a request to delete the service
        axios
          .delete(`http://localhost:9090/service-delete/${id}`)
          .then((res) => {
            toast.dismiss(loading);
            if (res.data) {
              setServices(removedServices);
              return swal(
                "Successfully Deleted!",
                "Your service has been successfully deleted.",
                "success"
              );
            }
            swal(
              "Failed!",
              "Something went wrong! Please try again.",
              "error",
              { dangerMode: true }
            );
          })
          .catch((err) => {
            toast.dismiss(loading);
            swal(
              "Failed!",
              "Something went wrong! Please try again.",
              "error",
              { dangerMode: true }
            );
          });
      }
    });
  };

  return (
    <Container>
      <div className="shadow p-5 bg-white" style={{ borderRadius: "15px" }}>
        {/* Check if there are services available */}
        {services.length > 0 ? (
          <Table className="table-style" hover responsive>
            <thead className="bg-light">
              <tr>
                <th>Sl. No</th>
                <th>Service</th>
                <th>Price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            {/* Iterate through the services and display them in a table */}
            {services.map((service, index) => {
              return (
                <tbody key={service._id} style={{ fontWeight: "500" }}>
                  <tr>
                    {/* Display service information */}
                    <td>{index + 1}</td>
                    <td>{service.name}</td>
                    <td>INR {service.price}</td>
                    <td className="text-center">
                      {/* Buttons for updating and deleting services */}
                      <Button
                        variant="outline-success"
                        className="p-1 mb-0"
                        onClick={() => handleUpdateService(service._id)}
                      >
                        <FontAwesomeIcon icon={faEdit} className="mx-1" />
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="p-1 ml-3 mb-0"
                        onClick={() => handleDeleteService(service._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} className="mx-1" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        ) : (
          // Display a spinner when there are no services
          <TableSpinner />
        )}
      </div>
    </Container>
  );
};

export default ManageService;
