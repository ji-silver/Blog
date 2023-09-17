'use client'
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

interface NoticeWriteProps {
    onTextChange: (text: string) => void;
    value: string;
}

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
        ['clean']
    ],
}

const TextEditor = ({ onTextChange, value }: NoticeWriteProps) => {
    const [editorValue, setEditorValue] = useState(value);

    const handleChange = (newValue: string) => {
        setEditorValue(newValue);
        onTextChange(newValue);
    };

    return (
        <div className='h-[500px]'>
            <QuillNoSSRWrapper theme="snow" value={editorValue} onChange={handleChange} modules={modules} style={{ height: "430px" }} />
        </div >
    )
}

export default TextEditor
