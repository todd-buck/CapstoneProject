import React from 'react';

import { Box } from '@mui/material';
 
import DashboardComponent from './dashboard.jsx';
import ProductCatalogCopmonent from './productcatalog.jsx';
//import UpdateInventoryComponent from './updateinventory.jsx';
//import AddNewProductComponent from './addnewproduct.jsx';
import ReportsComponent from './reports.jsx';
import ImportCSVComponent from './importcsv.jsx';
import LocationManagerComponent from './locationmanager.jsx';
import PutAwayManagerComponent from './putawaymanager.jsx';
import SettingsComponent from './settings.jsx';
import YourProfileComponent from './yourprofile.jsx';
import DocumentationComponent from './documentation.jsx';
//import AddNewUserComponent from './addnewuser.jsx';
import FAQsComponent from './faqs.jsx';

const Dashboard = ({ selected, scheme, setScheme }) => {

    const Content = () => {
        switch (selected) {

            case "Dashboard": return <DashboardComponent />;
            case "Product Catalog": return <ProductCatalogCopmonent />;
            //case "Update Inventory": return <UpdateInventoryComponent />;
            //case "Add New Product": return <AddNewProductComponent />;
            case "Reports": return <ReportsComponent />;
            case "Import CSV": return <ImportCSVComponent />;
            case "Location Manager": return <LocationManagerComponent />;
            case "Put Away Manager": return <PutAwayManagerComponent />;
            case "Settings": return <SettingsComponent scheme={scheme} setScheme={setScheme} />;
            case "Your Profile": return <YourProfileComponent />;
            //case "Add New Users": return <AddNewUserComponent />;
            case "Documentation": return <DocumentationComponent />;
            case "FAQs": return <FAQsComponent />;

            default: return <div>Welcome to the Dashboard!</div>
        }
    }

    return (
        <Box sx={{mt:1,ml:3, mr: 3, mb: 1}}>{Content()}</Box>
    )
}

export default Dashboard;