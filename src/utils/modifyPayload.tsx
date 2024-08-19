const modifyPayload = (values: any, file?: any) => {
  const formData = new FormData();
  const obj = { ...values };
  const data = JSON.stringify(obj);

  formData.append("data", data);

  if (file) {
    formData.append("file", file);
  }

  return formData;
};
export default modifyPayload;
