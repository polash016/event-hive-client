const modifyPayload = (values: any) => {
  const formData = new FormData();
  const obj = { ...values };
  const file = obj["file"];
  delete obj["file"];
  const data = JSON.stringify(obj);

  formData.append("data", data);

  if (file) {
    formData.append("file", file as Blob);
  }

  return formData;
};
export default modifyPayload;
