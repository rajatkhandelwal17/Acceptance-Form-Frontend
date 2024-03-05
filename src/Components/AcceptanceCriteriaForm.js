import React from "react";
import { Button, Grid, Paper, Typography, TextField } from "@mui/material";

import companyLogo from "../Images/Vwits Logo.jpeg";
import departmentLogo from "../Images/Skoda Logo.png";

import CostingTable from "./CostingTable";
import MemberBillingDetails from "./MemberBillingDetails";
import DeclarationCheckbox from "./DeclarationCheckbox";

import { ApiService } from "../Services/ApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AcceptanceCriteriaForm = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (formData) => {
    console.log(formData);
    try {
      await ApiService.submitFormData(formData);
      toast.success("Data Submitted Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <ToastContainer position="bottom-center" />
      <form>
        <Paper
          elevation={3}
          style={{
            padding: "10px",
            margin: "20px",
            textAlign: "center",
            maxWidth: "55%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              src={companyLogo}
              alt="Company Logo"
              style={{ height: "90px", marginRight: "auto" }}
            />
            <Typography variant="h3" gutterBottom>
              Acceptance Criteria
            </Typography>
            <img
              src={departmentLogo}
              alt="Department Logo"
              style={{ height: "110px", marginLeft: "auto" }}
            />
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Sub-Department"
                name="subDeprtmt"
                value={formData.subDeprtmt}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Project Name"
                name="projectName"
                fullWidth
                value={formData.projectName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Date"
                type="date"
                name="date"
                InputLabelProps={{ shrink: true }}
                value={formData.date}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="From Date"
                type="date"
                name="fromDate"
                InputLabelProps={{ shrink: true }}
                value={formData.fromDate}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="To Date"
                type="date"
                name="toDate"
                InputLabelProps={{ shrink: true }}
                value={formData.toDate}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Agreement Number"
                name="agrmntNumber"
                value={formData.agrmntNumber}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Order Number"
                name="ordrNumber"
                fullWidth
                value={formData.ordrNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Responsible Person"
                name="respPersonal"
                value={formData.respPersonal}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Service Provider"
                fullWidth
                name="srvcProvider"
                value={formData.srvcProvider}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Service Receiver"
                fullWidth
                name="srvcReceiver"
                value={formData.srvcReceiver}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Project Description"
                multiline
                rows={3}
                fullWidth
                name="prjctDesc"
                value={formData.prjctDesc}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <CostingTable formData={formData} setFormData={setFormData} />
            </Grid>
            <Grid item xs={12}>
              <MemberBillingDetails
                formData={formData}
                setFormData={setFormData}
              />
            </Grid>
            <Grid item xs={12}>
              <DeclarationCheckbox
                formData={formData}
                setFormData={setFormData}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Name of Manager"
                fullWidth
                name="mngrName"
                value={formData.mngrName}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Name of the Client"
                fullWidth
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleFormSubmit(formData)}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </>
  );
};

export default AcceptanceCriteriaForm;
