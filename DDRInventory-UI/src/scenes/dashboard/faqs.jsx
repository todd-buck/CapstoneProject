/* MUI COMPONENTS */
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import useTheme from "@mui/material/styles/useTheme";

/* ICONS */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { tokens } from "../../theme";

const FAQsComponent = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);
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
                        Click the icon in the top right corner, a slider appearing as either a sun or a moon, to toggle between light mode and dark mode. 
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
                       Access the product catalog, press the "+NEW PRODUCT" button in the top left, enter your item's name, quantity, and price per unit. Click "Add" to update the inventory with the new item.
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