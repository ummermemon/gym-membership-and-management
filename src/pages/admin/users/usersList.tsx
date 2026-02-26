import AdminNavbarComponent from "../components/navbar";
import { Helmet } from "react-helmet-async";
import UsersListComponent from "./components/list";
export default function UsersList() {

    /* -------------------- RETURN -------------------- */

    return (
        <>
            <Helmet>
                <title>Users | Gym Membership & Management System</title>
            </Helmet>

            <AdminNavbarComponent currentPage="users" />
            <UsersListComponent />
            
        </>
    );
}