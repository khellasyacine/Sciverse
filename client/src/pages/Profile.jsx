import CProfile from '../components/layout/Profile'
import { User } from '../constants';


const Profile = () =>{
    return (
        <div className="w-full h-full flex justify-start items-start flex-col bg-grey pt-4 max-md:pt-2">
            <CProfile user={User} />
        </div>
    );
}
export default Profile;