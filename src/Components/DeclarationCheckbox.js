import React from "react";
import { FormControlLabel, Checkbox, Typography } from "@mui/material";

const DeclarationCheckbox = ({ formData, setFormData }) => (
  <FormControlLabel
    control={<Checkbox />}
    label={
      <Typography variant="body2" marginTop={2}>
        We hereby declare that the information on this Acceptance Criteria is
        correct, and this invoice for this particular year will be billed for
        the given particular amount.
      </Typography>
    }
  />
);

export default DeclarationCheckbox;
