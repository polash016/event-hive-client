import { useGetProfileQuery } from "@/redux/api/userApi";
import OrganizerProfile from "@/utils/components/Dashboard/Profile/OrganizerProfile";

const OrganizerProfilePage = () => {
  return (
    <div>
      <OrganizerProfile />
    </div>
  );
};
export default OrganizerProfilePage;
