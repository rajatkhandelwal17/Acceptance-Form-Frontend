import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";

import companyLogo from "../Images/Vwits Logo.jpeg";
import departmentLogo from "../Images/Skoda Logo.png";
import volkswagen from "../Images/Volks.jpg";

import CostingTable from "./CostingTable";
import MemberBillingDetails from "./MemberBillingDetails";
import DeclarationCheckbox from "./DeclarationCheckbox";

import { ApiService } from "../Services/ApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AcceptanceCriteriaForm = ({ formData, setFormData }) => {
  const [agreementNumbers, setAgreementNumbers] = useState([]);
  const [manualEntry, setManualEntry] = useState(false);
  const [brand, setBrand] = useState("");
  const [isDatafetched, setIsDatafetched] = useState(false);
  const [agreementNumber, setAgreementNumber] = useState([]);
  const [justification, setJustification] = useState("");
  const [updateBilling, setUpdateBilling] = useState(false);

  useEffect(() => {
    fetchAgreementNumbers();
  }, [brand]);

  const fetchAgreementNumbers = async () => {
    try {
      const response = await ApiService.fetchAgreementNumbers(brand);
      setAgreementNumbers(response);
    } catch (error) {
      console.error("Error fetching agreement numbers:", error);
      toast.error("Error fetching agreement numbers");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "brand") {
      setBrand(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (formData) => {
    console.log(updateBilling);
    try {
      if (updateBilling) {
        await ApiService.submitFormData(formData);
        toast.success("Billing Details Updated");
        setUpdateBilling(false);
      } else {
        await ApiService.submitFormData(formData);
        toast.success("Data Submitted Successfully");
      }
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
 
  const handleUpdateBilling = (value) => {
    setUpdateBilling(value);
  };

  const handleAgreementNumberChange = async (e, selectedDate) => {
    const value = e.target.value;
    if (value === "manual") {
      setManualEntry(true);
      setIsDatafetched(false);
      setAgreementNumber(value);
    } else {
      setManualEntry(false);
      setAgreementNumber(value);
      try {
        const agreementData = await ApiService.fetchAgreementData(
          value,
          selectedDate
        );
        setFormData((prevData) => ({
          ...prevData,
          ...agreementData,
        }));
        setIsDatafetched(true);
        setJustification(agreementData.justification);
      } catch (error) {
        console.error("Error fetching agreement data:", error);
        toast.error("Error fetching agreement data");
      }
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

            {brand === "Volkswagen" ? (
              <img
                src={volkswagen}
                alt="Volkswagen Logo"
                style={{ height: "110px", marginLeft: "auto" }}
              />
            ) : (
              <img
                src={departmentLogo}
                alt="Skoda Logo"
                style={{ height: "110px", marginLeft: "auto" }}
              />
            )}
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                disabled={isDatafetched}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Sub-Department"
                name="subDeprtmt"
                value={formData.subDeprtmt}
                onChange={handleInputChange}
                disabled={isDatafetched}
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
                disabled={isDatafetched}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                select
                label="Brand"
                name="brand"
                fullWidth
                value={formData.brand}
                onChange={handleInputChange}
              >
                <MenuItem value="Volkswagen">Volkswagen</MenuItem>
                <MenuItem value="Skoda">Skoda</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Date"
                type="date"
                name="generatedDate"
                InputLabelProps={{ shrink: true }}
                value={formData.generatedDate}
                onChange={handleInputChange}
                disabled={isDatafetched}
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
                disabled={isDatafetched}
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
                disabled={isDatafetched}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              {manualEntry ? (
                <TextField
                  label="Agreement Number"
                  name="agrmntNumber"
                  value={formData.agrmntNumber}
                  onChange={handleInputChange}
                  fullWidth
                />
              ) : (
                <TextField
                  select
                  label="Agreement Number"
                  name="agrmntNumber"
                  value={formData.agrmntNumber}
                  onChange={(e) =>
                    handleAgreementNumberChange(e, formData.generatedDate)
                  }
                  fullWidth
                >
                  {agreementNumbers.map((agreementNumber) => (
                    <MenuItem key={agreementNumber} value={agreementNumber}>
                      {agreementNumber}
                    </MenuItem>
                  ))}
                  <MenuItem value="manual">Enter Manually</MenuItem>
                </TextField>
              )}
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Order Number"
                name="ordrNumber"
                fullWidth
                value={formData.ordrNumber}
                onChange={handleInputChange}
                disabled={isDatafetched}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Responsible Person"
                name="respPersonal"
                value={formData.respPersonal}
                onChange={handleInputChange}
                disabled={isDatafetched}
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
                disabled={isDatafetched}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Service Receiver"
                fullWidth
                name="srvcReceiver"
                value={formData.srvcReceiver}
                onChange={handleInputChange}
                disabled={isDatafetched}
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
                disabled={isDatafetched}
              />
            </Grid>

            <Grid item xs={12}>
              <CostingTable
                formData={formData}
                setFormData={setFormData}
                isDatafetched={isDatafetched}
              />
            </Grid>

            <Grid item xs={12}>
              <MemberBillingDetails
                formData={formData}
                setFormData={setFormData}
                isDatafetched={isDatafetched}
                agreementNumber={agreementNumber}
                // justification={justification}
                levelInfo={formData.levelInfo}
                handleUpdateBilling={handleUpdateBilling}
              />
            </Grid>

            <Grid item xs={12}>
              <DeclarationCheckbox
                formData={formData}
                setFormData={setFormData}
                isDatafetched={isDatafetched}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Name of Manager"
                fullWidth
                name="mngrName"
                value={formData.mngrName}
                onChange={handleInputChange}
                disabled={isDatafetched}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Name of the Client"
                fullWidth
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                disabled={isDatafetched}
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
