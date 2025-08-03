import Editor from "@monaco-editor/react";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../slices/store";
import { monacoLanguageMap } from "../constants/MonacoLangMap";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

interface CodeEditorProps {
    preview: string;
}

export interface PreviewRef {
    value: string;
}

const CodeEditor = forwardRef<PreviewRef, CodeEditorProps>(({ preview }, ref) => {
    const theme = useTheme();
    const codeLanguage = useSelector((state: RootState) => state.extraSlices.codeLanguage);
    const [language, setLanguage] = useState<string>('plaintext');
    const [value, setValue] = useState(preview);

    useImperativeHandle(ref, () => ({
        get value() {
            return value;
        }
    }))

    useEffect(() => {
        setLanguage(monacoLanguageMap[codeLanguage ?? ""] || 'plaintext');
    }, [codeLanguage]);

    return (
        <Box padding={1} bgcolor={theme.palette.background.editor} borderRadius={3}>
            <Editor
                height="200px"
                value={value}
                onChange={(e) => setValue(e ?? "")}
                language={language}
                theme="vs-dark"
                options={{
                    padding: {
                        top: 15,
                        bottom: 10,
                    },
                }}
            />
        </Box>
    );
})

export default CodeEditor;
