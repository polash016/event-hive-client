export const modifyPayload = (values: any) => {
  const formData = new FormData();
  const obj = { ...values };
  const file = obj["file"];
  delete obj["file"];
  const data = JSON.stringify(obj);

  formData.append("data", data);

  formData.append("file", file as Blob);

  return formData;
};

export const modifyEventPayload = (values: any) => {
  const formData = new FormData();
  const obj = { ...values };

  const eventImg = obj["events"];
  delete obj["events"];

  const artistImg = obj["artistImg"];
  delete obj["artistImg"];

  const speakerImg = obj["speakerImg"];
  delete obj["speakerImg"];

  const data = JSON.stringify(obj);

  formData.append("data", data);

  if (eventImg && Array.isArray(eventImg)) {
    eventImg.forEach((file: File) => {
      formData.append("events", file);
    });
  }

  // Append artist image to form data
  if (artistImg) {
    formData.append("artistImg", artistImg as File);
  }

  // Append speaker image to form data
  if (speakerImg) {
    formData.append("speakerImg", speakerImg as File);
  }

  //if (eventImg)
  //formData.append("events", eventImg as Blob);

  // if (artistImg)
  //formData.append("artistImg", eventImg as Blob);

  //if (speakerImg)
  //formData.append("speakerImg", eventImg as Blob);

  console.log(JSON.stringify(Object.fromEntries(formData.entries()), null, 2));

  return formData;
};
