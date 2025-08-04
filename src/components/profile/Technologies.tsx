import { Autocomplete, Box, Chip, Stack, TextField, Typography } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import { options } from "../../constants/Options";

interface TechnologiesProps {
    techStack: string[];
}

export interface TechnologiesRef {
  value: string[];
}

const Technologies = forwardRef<TechnologiesRef, TechnologiesProps>(({ techStack }, ref) => {
    const [error, setError] = useState<string | null>(null);
    const [inputKey, setInputKey] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [selectedTechs, setSelectedTechs] = useState<string[]>(techStack);

    useImperativeHandle(ref, () => ({
        get value() {
            return selectedTechs;
        }
    }));

    const handleDelete = (technologyName: string) => {
        setSelectedTechs(prev => (
            prev.filter(e => e !== technologyName)
        ));
    };

    return (
        <>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Autocomplete
                key={inputKey}
                freeSolo={false}
                inputValue={inputValue}
                onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
                onChange={(_, value) => {
                    const selectedTech = options.find((tech) => tech.name === value);

                    if (selectedTech) {
                        if(!selectedTechs.find(tech => tech === selectedTech.name)) {
                            setSelectedTechs(prev => [...prev, selectedTech.name]); 
                            setInputKey(prev => prev + 1);
                            setError("");
                        }

                        else setError(selectedTech.name + " already exists");

                        setInputValue("");
                        setInputKey(prev => prev + 1);
                    }

                    else console.log("Invalid or custom input:", value);
                }}
                options={options.map((option) => option.name)}
                renderInput={(params) => <TextField {...params} label="Choose your technology" />}
            />
            { error && <Typography color="error"> { error } </Typography> }

            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                {selectedTechs.map((technologyName) => (
                <Chip
                    key={technologyName}
                    style={{ padding: 4 }}
                    label={technologyName}
                    size="small"
                    variant="outlined"
                    onDelete={() => handleDelete(technologyName)}
                    sx={{ mb: 0.5 }}
                />
                ))}
            </Stack>
        </Box>
        </>
    );
});

export default Technologies;