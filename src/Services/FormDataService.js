export const FormDataService = {
  formData: {
    projectId: "",
    department: "",
    subDeprtmt: "",
    projectName: "",
    date: "",
    fromDate: "",
    toDate: "",
    agrmntNumber: "",
    ordrNumber: "",
    respPersonal: "",
    srvcProvider: "",
    srvcReceiver: "",
    prjctDesc: "",
    srvcCost: "",
    srvcMonthlyCost: "",
    srvcRemainBdgt: "",
    miscCost: "",
    miscPricing: "",
    miscMonthlyBdgt: "",
    miscRemainBdgt: "",
    totalCost: "",
    totalMonthlyBdgt: "",
    totalRemainBdgt: "",
    mngrName: "",
    clientName: "",
    level: "",
    member: "",
    pricing: "",
    justification: "",
  },
  getFormData: function () {
    return this.formData;
  },
};

export default FormDataService;
