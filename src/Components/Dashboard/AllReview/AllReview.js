// Import necessary dependencies and components
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { UserContext } from "../../../App";
import TableSpinner from "../TableSpinner/TableSpinner";

// Create a functional component named AllReview
const AllReview = () => {
  // Access the loggedInUser's email from the UserContext
  const {
    loggedInUser: { email },
  } = useContext(UserContext);

  // Initialize a state variable to store reviews data
  const [reviews, setReviews] = useState([]);

  // Fetch review data from the server using Axios when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:9090/all-review")
      .then((res) => {
        setReviews(res.data);
      })
      .catch((error) => toast.error(error.message));
  }, []);

  // Handle the deletion of a review
  const handleDeleteReview = (id) => {
    if (email === "admin@test.gmail") {
      return swal(
        "Permission restriction!",
        "As a test-admin, you don't have this permission.",
        "info"
      );
    }

    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this review?",
      icon: "warning",
      buttons: [true, "Yes"],
      dangerMode: true,
    }).then((wantDelete) => {
      if (wantDelete) {
        const loading = toast.loading("Deleting...Please wait!");
        const removedReviews = reviews.filter((item) => item._id !== id);

        axios
          .delete(`http://localhost:9090/delete-review/${id}`)
          .then((res) => {
            toast.dismiss(loading);
            if (res.data) {
              setReviews(removedReviews);
              return swal(
                "Successfully Deleted!",
                "This Review has been successfully deleted.",
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

  // Render the UI elements
  return (
    <Container>
      <div className="shadow p-5 bg-white" style={{ borderRadius: "15px" }}>
        {reviews.length > 0 ? (
          <Table className="table-style" hover responsive>
            <thead className="bg-light">
              <tr>
                <th>Sl. No</th>
                <th>Name</th>
                <th>Description</th>
                <th>Address</th>
                <th>Star</th>
                <th>Action</th>
              </tr>
            </thead>
            {reviews.map((review, index) => {
              return (
                <tbody key={review._id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{review.name}</td>
                    <td>{review.description}</td>
                    <td>{review.address}</td>
                    <td>{review.star}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        className="p-1 ml-3 mb-0"
                        onClick={() => handleDeleteReview(review._id)}
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
          <TableSpinner />
        )}
      </div>
    </Container>
  );
};

export default AllReview;
