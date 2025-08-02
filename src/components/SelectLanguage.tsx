import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { options } from "../constants/Options";
import { forwardRef, useImperativeHandle, useState } from "react";

interface SelectLanguageProps {
    selectedTech: string,
}

export interface SelectLanguageRef {
    value: string,
}

const SelectLanguage = forwardRef<SelectLanguageRef, SelectLanguageProps>(( { selectedTech }, ref ) => {
    const [tech, setTech] = useState(selectedTech);

    useImperativeHandle(ref, () => ({
        get value() {
            return tech;
        }
    }))

    const handleChange = (event: SelectChangeEvent) =>
        setTech(event.target.value as string);

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    Technologies
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tech}
                    label="Technology"
                    onChange={handleChange}
                >
                    {options.map((option) => (
                        <MenuItem value={option.name} key={option.id}> {option.name} </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
})

export default SelectLanguage;