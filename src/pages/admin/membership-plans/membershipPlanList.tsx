import AdminNavbarComponent from "../components/navbar";
import { Helmet } from "react-helmet-async";
import MembershipPlansListComponent from "./components/list";
export default function MembershipPlanList() {

    /* -------------------- RETURN -------------------- */

    return (
        <>
            <Helmet>
                <title>Membership Plans | Gym Membership & Management System</title>
            </Helmet>

            <AdminNavbarComponent currentPage="users" />
            <MembershipPlansListComponent />
            
        </>
    );
}