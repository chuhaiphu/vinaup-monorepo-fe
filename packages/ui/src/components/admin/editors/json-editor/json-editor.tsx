'use client';

import Editor from '@monaco-editor/react';
import { Loader } from '@mantine/core';

interface JSONEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  height?: string;
  readOnly?: boolean;
}

export function JSONEditor({
  value = '',
  onChange,
  height = '400px',
  readOnly = false
}: JSONEditorProps) {
  const handleEditorChange = (newValue: string | undefined) => {
    onChange?.(newValue || '');
  };

  return (
    <Editor
      height={height}
      defaultLanguage="json"
      value={value}
      onChange={handleEditorChange}
      theme="vs-light"
      loading={<Loader size="sm" />}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        readOnly,
        lineNumbers: 'on',
        formatOnPaste: true,
        formatOnType: true,
        tabSize: 2,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        renderWhitespace: 'selection',
        folding: true,
        bracketPairColorization: { enabled: true },
      }}
    />
  );
}
