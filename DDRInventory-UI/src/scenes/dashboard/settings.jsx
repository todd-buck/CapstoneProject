/* MUI COMPONENTS */
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SettingsComponent = ({ scheme, setScheme }) => {

    const handleChange = event => {
        setScheme(event.target.value);
    };

    return (
        <div>
            <Typography variant="h1" sx={{p:2}}>
                Settings
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <Typography variant="h4" sx={{p:2}}>
                    Select Color Scheme:
                </Typography>
                <Select value={scheme} onChange={handleChange}>
                    <MenuItem value="default">Default</MenuItem>
                    <MenuItem value="contrast">Contrast</MenuItem>
                    <MenuItem value="desert">Desert</MenuItem>
                    <MenuItem value="flamingo">Flamingo</MenuItem>
                    <MenuItem value="sea">Sea</MenuItem>
                    <MenuItem value="daisy">Daisy</MenuItem>
                </Select>
            </Box>
        </div>
    );
}

export default SettingsComponent;