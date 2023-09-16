'use client'
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

const TextEditor = () => {
    const [value, setValue] = useState('');
    return (
        <div>
            <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} className='editor-input' />
        </div>
    )
}

export default TextEditor
