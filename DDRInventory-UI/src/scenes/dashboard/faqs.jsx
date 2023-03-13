import React from 'react';

import { useTheme, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import { tokens } from "../../theme";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQsComponent = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const questionStyle = { bgcolor: colors.primary[200]};
    const answerStyle = { bgcolor: colors.primary[300] };
    const questionVariant = "h5";
    const answerVariant = "p";

    return (
        <div style={{ maxWidth: '900px' }}>
            <Typography variant="h1" sx={{p:2}}>
                Frequently Asked Questions
            </Typography>
            <Accordion>
                <AccordionSummary sx={questionStyle} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography variant={questionVariant}>
                        How do I change my display mode from light to dark?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={answerStyle}>
                    <Typography variant={answerVariant}>
                        Click the icon in the top right corner, appearing as either a sun or a moon, to toggle between light mode and dark mode. 
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary sx={questionStyle} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography variant={questionVariant}>
                        How can I add an item to the inventory?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={answerStyle}>
                    <Typography variant={answerVariant}>
                        Navigate to the "Add New Product" tab. Enter your item's name, quantity, and price per unit. Click "Add" to update the inventory with the new item.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary sx={questionStyle} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography variant={questionVariant}>
                        I want to change my name in "My Profile". How would I do that?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={answerStyle}>
                    <Typography variant={answerVariant}>
                        To edit your profile, you must first be signed in to your account. Next, click the "Edit" button located below the user's profile area.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            {/*<Accordion>*/}
            {/*    <AccordionSummary sx={questionStyle} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">*/}
            {/*        <Typography variant={questionVariant}>*/}
            {/*            Question*/}
            {/*        </Typography>*/}
            {/*    </AccordionSummary>*/}
            {/*    <AccordionDetails sx={answerStyle}>*/}
            {/*        <Typography variant={answerVariant}>*/}
            {/*            Answer*/}
            {/*        </Typography>*/}
            {/*    </AccordionDetails>*/}
            {/*</Accordion>*/}
            {/*<Accordion>*/}
            {/*    <AccordionSummary sx={questionStyle} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">*/}
            {/*        <Typography variant={questionVariant}>*/}
            {/*            Question*/}
            {/*        </Typography>*/}
            {/*    </AccordionSummary>*/}
            {/*    <AccordionDetails sx={answerStyle}>*/}
            {/*        <Typography variant={answerVariant}>*/}
            {/*            Answer*/}
            {/*        </Typography>*/}
            {/*    </AccordionDetails>*/}
            {/*</Accordion>*/}
            {/*<Accordion>*/}
            {/*    <AccordionSummary sx={questionStyle} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">*/}
            {/*        <Typography variant={questionVariant}>*/}
            {/*            Question*/}
            {/*        </Typography>*/}
            {/*    </AccordionSummary>*/}
            {/*    <AccordionDetails sx={answerStyle}>*/}
            {/*        <Typography variant={answerVariant}>*/}
            {/*            Answer*/}
            {/*        </Typography>*/}
            {/*    </AccordionDetails>*/}
            {/*</Accordion>*/}
            {/*<Accordion>*/}
            {/*    <AccordionSummary sx={questionStyle} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">*/}
            {/*        <Typography variant={questionVariant}>*/}
            {/*            Question*/}
            {/*        </Typography>*/}
            {/*    </AccordionSummary>*/}
            {/*    <AccordionDetails sx={answerStyle}>*/}
            {/*        <Typography variant={answerVariant}>*/}
            {/*            Answer*/}
            {/*        </Typography>*/}
            {/*    </AccordionDetails>*/}
            {/*</Accordion>*/}
            {/*<Accordion>*/}
            {/*    <AccordionSummary sx={questionStyle} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">*/}
            {/*        <Typography variant={questionVariant}>*/}
            {/*            Question*/}
            {/*        </Typography>*/}
            {/*    </AccordionSummary>*/}
            {/*    <AccordionDetails sx={answerStyle}>*/}
            {/*        <Typography variant={answerVariant}>*/}
            {/*            Answer*/}
            {/*        </Typography>*/}
            {/*    </AccordionDetails>*/}
            {/*</Accordion>*/}
            <Accordion>
                <AccordionSummary sx={questionStyle} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography variant={questionVariant}>
                        I have a technical question that was not answered by the above list. Who can I contact for assistance?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={answerStyle}>
                    <Typography variant={answerVariant}>
                        Please reach out to our 24/7 technical support team at (123) 867-5309.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default FAQsComponent;