import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { options } from "../constants/Options";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCodeLanguage } from "../slices/extraSlices";

interface SelectLanguageProps {
    selectedTech: string,
}

export interface SelectLanguageRef {
    value: string,
}

const SelectLanguage = forwardRef<SelectLanguageRef, SelectLanguageProps>(( { selectedTech }, ref ) => {
    const [tech, setTech] = useState(selectedTech);
    const dispatch = useDispatch();

    const findOptionId = (e: string) => {
        const selectedOption = options.find(option => option.name === e)
        dispatch(updateCodeLanguage(selectedOption?.id ?? ""));
    }

    useEffect(() => {
        findOptionId(selectedTech);
    }, []);

    useImperativeHandle(ref, () => ({
        get value() {
            return tech;
        }
    }))

    const handleChange = (event: SelectChangeEvent) => {
        const selectedName = event.target.value;
        setTech(selectedName);
        findOptionId(selectedName);
    }

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