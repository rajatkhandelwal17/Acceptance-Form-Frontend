import React, { useState } from "react";
import { Grid, IconButton, Paper, TextField, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const MemberBillingDetails = ({ formData, setFormData }) => {
  const [memberData, setMemberData] = useState([
    { level: 0, members: 0, pricing: 0 },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onAddMember = () => {
    setMemberData([...memberData, { level: 0, members: 0, pricing: 0 }]);
  };

  const onRemoveMember = (index) => {
    const updatedMemberData = [...memberData];
    updatedMemberData.splice(index, 1);
    setMemberData(updatedMemberData);
  };

  const calculateSrvcBudget = () => {
    const totalMembers = formData.member;
    const totalPricing = formData.pricing;

    const currentMonthBudget = totalMembers * totalPricing;
    formData.srvcMonthlyCost = currentMonthBudget;

    const remainingBudget = formData.srvcCost - currentMonthBudget;
    formData.srvcRemainBdgt = remainingBudget;

    setFormData((prevData) => ({
      ...prevData,
      srvcMonthlyCost: currentMonthBudget,
      srvcRemainBdgt: remainingBudget,
    }));
  };

  const calculateMiscBudget = () => {
    const monthly_miscellaneous = formData.miscPricing;
    formData.miscMonthlyBdgt = formData.miscPricing;

    const remaining_miscellaneous =
      formData.miscCost - formData.miscMonthlyBdgt;
    formData.miscRemainBdgt = formData.miscCost - formData.miscMonthlyBdgt;

    const mnthly_budget =
      Number(formData.srvcMonthlyCost) + Number(formData.miscMonthlyBdgt);
    formData.totalMonthlyBdgt = mnthly_budget;

    const rmng_budget =
      Number(formData.srvcRemainBdgt) + Number(formData.miscRemainBdgt);
    formData.totalRemainBdgt = rmng_budget;

    setFormData((prevData) => ({
      ...prevData,
      miscMonthlyBdgt: monthly_miscellaneous,
      miscRemainBdgt: remaining_miscellaneous,
      totalMonthlyBdgt: mnthly_budget,
      totalRemainBdgt: rmng_budget,
    }));
  };

  return (
    <Paper elevation={3} style={{ padding: "5px", margin: "5px" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
      >
        <div style={{ flex: 1, backgroundColor: "#93014A", height: "3px" }} />
        <p style={{ margin: "0 10px", fontSize: "20px" }}>Billing Details</p>
        <div style={{ flex: 1, backgroundColor: "#93014A", height: "3px" }} />
      </div>

      <Grid item xs={3.5} marginTop={1.5}>
        <Typography variant="body1">Service Cost Details</Typography>
      </Grid>

      <Grid container spacing={1}>
        {memberData.map((member, index) => (
          <Grid
            container
            item
            spacing={1}
            key={index}
            marginTop={0.001}
            marginLeft={2}
          >
            <Grid item xs={3.5}>
              <TextField
                label={`Level`}
                type="number"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={3.5}>
              <TextField
                label={`Members`}
                type="number"
                name="member"
                value={formData.member}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={3.5}>
              <TextField
                label={`Pricing (€)`}
                type="number"
                name="pricing"
                value={formData.pricing}
                onChange={handleInputChange}
                onBlur={calculateSrvcBudget}
                fullWidth
              />
            </Grid>

            <Grid item xs={0.5}>
              <IconButton
                color="error"
                onClick={() => onRemoveMember(index)}
                disabled={memberData.length === 1}
                style={{
                  backgroundColor: "Background",
                  borderRadius: "50%",
                  width: "26px",
                  height: "26px",
                  padding: "0",
                  marginTop: "15px",
                  marginLeft: "15px",
                }}
              >
                <RemoveIcon />
              </IconButton>
            </Grid>

            <Grid item xs={0.5}>
              <IconButton
                color="primary"
                startIcon={<AddIcon />}
                onClick={onAddMember}
                style={{
                  backgroundColor: "Background",
                  borderRadius: "50%",
                  width: "26px",
                  height: "26px",
                  padding: "0",
                  marginTop: "15px",
                  marginLeft: "15px",
                }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <Grid item xs={3.5} marginTop={0.5}>
          <Typography variant="body1">Miscellaneous Details</Typography>
        </Grid>

        {/* Justification */}
        <Grid item xs={12} marginBottom={1}>
          <Grid container spacing={1} marginLeft={2}>
            <Grid item xs={3.5} alignSelf={"center"}>
              <TextField
                label="Pricing (€)"
                name="miscPricing"
                value={formData.miscPricing}
                onChange={handleInputChange}
                onBlur={calculateMiscBudget}
                fullWidth
              />
            </Grid>
            <Grid item xs={6.7}>
              <TextField
                label="Justification for Miscellaneous Cost"
                name="justification"
                value={formData.justification}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MemberBillingDetails;
