import AdminNavbarComponent from "../components/navbar";
import { Helmet } from "react-helmet-async";
import DietPlansListComponent from "./components/list";
export default function DietPlanList() {

    /* -------------------- RETURN -------------------- */

    return (
        <>
            <Helmet>
                <title>Diet Plans | Gym Membership & Management System</title>
            </Helmet>

            <AdminNavbarComponent />
            <DietPlansListComponent />
            
        </>
    );
}