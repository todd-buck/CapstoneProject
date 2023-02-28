import React from 'react';

import { Box } from '@mui/material';

import DashboardComponent from './Dashboard.jsx';
import ProductCatalogCopmonent from './ProductCatalog.jsx';
import UpdateInventoryComponent from './UpdateInventory.jsx';
import AddNewProductComponent from './AddNewProduct.jsx';
import ReportsComponent from './Reports.jsx';
import ImportCSVComponent from './ImportCSV.jsx';
import YourProfileComponent from './YourProfile.jsx';
import DocumentationComponent from './Documentation.jsx';
import AddNewUserComponent from './AddNewUser.jsx';
import FAQsComponent from './FAQs.jsx';

const Dashboard = ({ selected }) => {

    const Content = () => {
        switch (selected) {

            case "Dashboard": return <DashboardComponent />;
            case "Product Catalog": return <ProductCatalogCopmonent />;
            case "Update Inventory": return <UpdateInventoryComponent />;
            case "Add New Product": return <AddNewProductComponent />;
            case "Reports": return <ReportsComponent />;
            case "Import CSV": return <ImportCSVComponent />;
            case "Your Profile": return <YourProfileComponent />;
            case "Add New Users": return <AddNewUserComponent />;
            case "Documentation": return <DocumentationComponent />;
            case "FAQs": return <FAQsComponent />;

            default: return <div>Welcome to the Dashboard!</div>
        }
    }

    return (
        <Box sx={{mt:1,ml:3}}>{Content()}</Box>
    )
}

export default Dashboard;