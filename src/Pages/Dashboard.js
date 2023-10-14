// Import necessary React components and hooks
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../App';

// Import components used in the Dashboard
import AddAdmin from '../Components/Dashboard/AddAdmin/AddAdmin';
import AddServices from '../Components/Dashboard/AddService/AddServices';
import AllAdmin from '../Components/Dashboard/AllAdmin/AllAdmin';
import AllReview from '../Components/Dashboard/AllReview/AllReview';
import Book from '../Components/Dashboard/Book/Book';
import BookList from '../Components/Dashboard/BookList/BookList';
import ManageService from '../Components/Dashboard/ManageService/ManageService';
import NavBar from '../Components/Dashboard/NavBar/NavBar';
import OrderList from '../Components/Dashboard/OrderList/OrderList';
import Profile from '../Components/Dashboard/Profile/Profile';
import Review from '../Components/Dashboard/Review/Review';
import SideBar from '../Components/Dashboard/SideBar/SideBar';

// Import styles for the Dashboard
import './Dashboard.css';

// Define the Dashboard component
const Dashboard = ({ adminLoading }) => {
    const { isAdmin } = useContext(UserContext);
    const { panel } = useParams();
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <main className="dashboard-container">
            {/* Display the sidebar component */}
            <SideBar show={showSidebar} adminLoading={adminLoading} />

            <div id="content">
                {/* Display the navigation bar component */}
                <NavBar setShowSidebar={setShowSidebar} show={showSidebar} />

                {/* Render different components based on the 'panel' parameter */}
                {
                    panel === "profile" ? <Profile />
                    : panel === "book" ? <Book />
                    : panel === "book-list" ? <BookList />
                    : panel === "reviews" ? <Review />
                    : panel === "add-services" && isAdmin ? <AddServices />
                    : panel === "add-admins" && isAdmin ? <AddAdmin />
                    : panel === "all-orders" && isAdmin ? <OrderList />
                    : panel === "manage-services" && isAdmin ? <ManageService />
                    : panel === "all-reviews" && isAdmin ? <AllReview />
                    : panel === "all-admins" && isAdmin ? <AllAdmin />
                    : null
                }
            </div>
        </main>
    );
};

export default Dashboard;
