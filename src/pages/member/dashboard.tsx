import MemberNavbarComponent from "./components/navbar";
import { Helmet } from "react-helmet-async";
export default function MemberDashboardPage() {

    return (
        <>
            <Helmet>
                <title>Dashboard | Gym Membership & Management System</title>
            </Helmet>
            <MemberNavbarComponent />
        </>
    );
}
