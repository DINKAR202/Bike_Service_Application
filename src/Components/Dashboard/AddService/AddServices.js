import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import swal from "sweetalert";
import "./AddService.css";

const AddServices = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imageURL, setImageURL] = useState(null);
  const [isButtonDisable, setIsButtonDisable] = useState(true);

  // Function to handle form submission
  const onSubmit = (data) => {
    // Create service data object
    const serviceData = {
      name: data.name,
      price: data.price,
      description: data.description,
      image: imageURL,
    };

    const loading = toast.loading("Adding...Please wait!");

    // Send a POST request to add the service
    const url = "http://localhost:9090/add-services";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(serviceData),
    }).then((res) => {
      if (res) {
        toast.dismiss(loading);
        reset();
        setIsButtonDisable(true);
        return swal(
          `Successfully Added!`,
          `${data.name} service has been successfully Added`,
          "success"
        );
      }
      swal("Failed!", "Something went wrong! Please try again.", "error", {
        dangerMode: true,
      });
    });
  };

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const imageData = new FormData();
    imageData.set("key", "76ea5ef96db8950bc0df8a7f01d855fe");
    imageData.append("image", event.target.files[0]);
    const loading = toast.loading("Uploading...Please wait!");

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        toast.dismiss(loading);
        if (response) {
          toast.success("Successfully upload Image...!!!");
          setImageURL(response.data.data.display_url);
          setIsButtonDisable(false);
        }
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <section className="add-service">
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)} className="w-100 shadow">
          <div
            className="p-5 bg-white form-main"
            style={{ borderRadius: "15px" }}
          >
            <Form.Row className="justify-content-center">
              {/* Service Title input */}
              <Form.Group
                as={Col}
                md={5}
                sm={12}
                className="mr-md-5 admin-group"
              >
                <Form.Label>Service Title</Form.Label>
                <Form.Control
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Enter Service Title"
                />
              </Form.Group>

              {/* Service Price input */}
              <Form.Group as={Col} md={5} sm={12} className="admin-group">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  {...register("price", { required: true })}
                  placeholder="Enter Service Price"
                />
              </Form.Group>

              {/* Service Description input */}
              <Form.Group
                as={Col}
                md={5}
                sm={12}
                className="mr-md-5 mt-md-3 admin-group"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  {...register("description", { required: true })}
                  placeholder="Enter Service Description"
                />
              </Form.Group>

              {/* Image Upload input */}
              <Form.Group
                as={Col}
                md={5}
                sm={12}
                className="mt-md-3 admin-group"
              >
                <Form.Label>Add Image</Form.Label>
                <Button
                  as={"label"}
                  htmlFor="upload"
                  variant="outline-primary"
                  className="d-block p-2 upload-btn"
                >
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" />
                  Upload Image
                </Button>
                <Form.Control
                  hidden="hidden"
                  id="upload"
                  onChange={handleImageUpload}
                  type="file"
                  placeholder="Upload photo"
                />
              </Form.Group>
            </Form.Row>

            {/* Submit button */}
            <div className="text-center mt-4">
              <Button
                type="submit"
                variant="info"
                disabled={isButtonDisable}
                className="main-button"
              >
                Add Service
              </Button>
            </div>
          </div>
        </Form>
      </Container>
    </section>
  );
};

export default AddServices;
