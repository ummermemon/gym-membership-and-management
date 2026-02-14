import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const EditProfilePage = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [user, setUser] = useState(null);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        profile_img: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "profile_img") {
            setFormData({ ...formData, profile_img: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const form = new FormData();
        form.append("first_name", formData.first_name);
        form.append("last_name", formData.last_name);

        if (formData.profile_img) {
            form.append("profile_img", formData.profile_img);
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/member/edit-profile`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: form,
                }
            );

            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };


    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/me`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const res = await response.json();
            const userData = res.data;

            setUser(userData);

            setFormData({
                first_name: userData.fname || "",
                last_name: userData.lname || "",
                profile_img: null,
            });

        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };


    return (
        <div className="min-h-screen flex bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-6">
                    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
                        <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Profile Image
                                </label>
                                <input
                                    type="file"
                                    name="profile_img"
                                    onChange={handleChange}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default EditProfilePage;
