import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github.css"; // You can pick any highlight.js theme here
import "highlight.js/styles/atom-one-dark.css"; // Dark theme
import { useMediaQuery, useTheme } from "@mui/material";

interface MarkdownViewerProps {
    content: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
    const isSmall = useMediaQuery("(max-width:507px)");
    const theme = useTheme();

    return (
        <div className={theme.palette.mode === "dark" ? "dark-theme" : "light-theme"} 
            style={{ fontSize: isSmall ? "14px" : "16px" }}>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]} >
                {content}
            </ReactMarkdown>
            <style>{`
        /* Show only light theme styles in light mode */
        .light-theme pre code {
          all: unset;
        }
        .light-theme pre {
          /* Reset dark theme styles */
          background-color: #f1f3f6ff !important;
          color: #24292e !important;
          padding: 15px !important;
          border-radius: 10px !important; 
        }

        /* Show only dark theme styles in dark mode */
        .dark-theme pre {
          background-color: #282c34 !important;
          color: #abb2bf !important;
          padding: 5px !important;
          border-radius: 10px !important; 
        }
      `}</style>
        </div>
    );
};

export default MarkdownViewer;
