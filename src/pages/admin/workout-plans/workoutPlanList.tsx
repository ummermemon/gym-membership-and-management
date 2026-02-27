import AdminNavbarComponent from "../components/navbar";
import { Helmet } from "react-helmet-async";
import WorkoutPlansListComponent from "./components/list";
export default function WorkoutPlanList() {

    /* -------------------- RETURN -------------------- */

    return (
        <>
            <Helmet>
                <title>Workout Plans | Gym Membership & Management System</title>
            </Helmet>

            <AdminNavbarComponent currentPage="users" />
            <WorkoutPlansListComponent />
            
        </>
    );
}