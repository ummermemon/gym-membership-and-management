import AdminNavbarComponent from "./components/navbar";
import { Helmet } from "react-helmet-async";
import UsersListComponent from "./users/components/list";
export default function AdminDashboardPage() {

    /* -------------------- RETURN -------------------- */

    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>

            <AdminNavbarComponent />
            <UsersListComponent />
            
        </>
    );
}