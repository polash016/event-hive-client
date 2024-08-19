"use server";

export const registerAttendee = async (formData: FormData) => {
  const res = await fetch(
    `${process.env.EVENT_HIVE_API_URL}/user/create-attendee`,
    {
      method: "POST",
      body: formData,
      cache: "no-store",
    }
  );

  const attendee = await res.json();

  return attendee;
};
