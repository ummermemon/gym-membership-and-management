import AdminNavbarComponent from "./components/navbar";
import { Helmet } from "react-helmet-async";
export default function AdminDashboardPage() {
    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <AdminNavbarComponent currentPage="dashboard" />
            
        </>
    );
}