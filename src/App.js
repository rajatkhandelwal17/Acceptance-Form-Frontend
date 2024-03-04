import React, { useState } from "react";
import FormDataService from "./Services/FormDataService";
import AcceptanceCriteriaForm from "./Components/AcceptanceCriteriaForm";

const App = () => {
  const [formData, setFormData] = useState(FormDataService.getFormData());

  return (
    <div>
      <AcceptanceCriteriaForm formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default App;
