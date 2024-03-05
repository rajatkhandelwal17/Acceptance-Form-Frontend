import React, { useState } from "react";
import { Grid, IconButton, Paper, TextField, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const MemberBillingDetails = ({ formData, setFormData }) => {
  const [memberData, setMemberData] = useState([
    { level: "", members: "", pricing: "" },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = [...memberData];
    updatedData[index][name] = value;
    setMemberData(updatedData);
  };

  const handleInputChangeMisc = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onAddMember = () => {
    setMemberData([...memberData, { level: "", members: "", pricing: "" }]);
  };

  const onRemoveMember = (index) => {
    const updatedMemberData = [...memberData];
    updatedMemberData.splice(index, 1);
    setMemberData(updatedMemberData);
  };

  const calculateSrvcBudget = () => {
    let totalServiceCost = 0;

    memberData.forEach((member) => {
      const members = Number(member.members);
      const pricing = Number(member.pricing);
      const memberCost = members * pricing;
      totalServiceCost += memberCost;
    });

    // Update form data with the total service cost
    formData.srvcMonthlyCost = totalServiceCost;

    // Update remaining budget
    const remainingBudget = formData.srvcCost - totalServiceCost;
    formData.srvcRemainBdgt = remainingBudget;

    // Update levelInfo array
    const levelInfo = memberData.map((member) => ({
      member: Number(member.members),
      level: Number(member.level),
      price: Number(member.pricing),
    }));

    formData.levelInfo = levelInfo;

    setFormData((prevData) => ({
      ...prevData,
      srvcMonthlyCost: totalServiceCost,
      srvcRemainBdgt: remainingBudget,
      levelInfo: levelInfo,
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

      {memberData.map((member, index) => (
        <Grid
          container
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
              value={member.level}
              onChange={(e) => handleInputChange(e, index)}
              fullWidth
            />
          </Grid>
          <Grid item xs={3.5}>
            <TextField
              label={`Members`}
              type="number"
              name="members"
              value={member.members}
              onChange={(e) => handleInputChange(e, index)}
              fullWidth
            />
          </Grid>
          <Grid item xs={3.5}>
            <TextField
              label={`Pricing (€)`}
              type="number"
              name="pricing"
              value={member.pricing}
              onChange={(e) => handleInputChange(e, index)}
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

      <Grid item xs={3.5} marginTop={0.8}>
        <Typography variant="body1">Miscellaneous Details</Typography>
      </Grid>

      {/* Justification */}
      <Grid item xs={12} marginBottom={1}>
        <Grid container spacing={1} marginLeft={2} marginTop={0.001}>
          <Grid item xs={3.5} alignSelf={"center"}>
            <TextField
              label="Pricing (€)"
              name="miscPricing"
              value={formData.miscPricing}
              onChange={handleInputChangeMisc}
              onBlur={calculateMiscBudget}
              fullWidth
            />
          </Grid>
          <Grid item xs={6.7}>
            <TextField
              label="Justification for Miscellaneous Cost"
              name="justification"
              value={formData.justification}
              onChange={handleInputChangeMisc}
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MemberBillingDetails;
