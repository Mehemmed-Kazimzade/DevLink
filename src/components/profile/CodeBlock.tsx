import { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; 
import { Box } from '@mui/material';

interface CodeBlockProps {
    language: string,
    code: string,
}

const CodeBlock = ({ language, code }: CodeBlockProps) => {
  const codeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (codeRef.current) {
        hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <Box
      sx={{
        overflowX: 'auto',
        backgroundColor: '#f6f8fa',
        borderRadius: '5px',
        padding: '1em',
        margin: '0.5em 0',
        maxWidth: '100%',
      }}
    >
      <pre
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: 'transparent',
          overflow: 'visible',
        }}
        >
        <code
          ref={codeRef}
          className={language}
          style={{
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '1rem',
            display: 'block',
            whiteSpace: 'pre-wrap', // Changed from pre-wrap to pre for horizontal scrolling
            overflowX: 'auto',
            wordBreak: 'break-word'
          }}
        >
          {code}
        </code>
      </pre>
    </Box>
  );
};

export default CodeBlock;

