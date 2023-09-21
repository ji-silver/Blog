'use client'
import React, { useEffect, useMemo, useState, useRef } from 'react';
import AWS from 'aws-sdk';
import ReactQuill from 'react-quill';
import { NoticeWriteProps } from '@/types';
import 'react-quill/dist/quill.snow.css';
import styles from './textEditor.module.scss'

AWS.config.update({
    region: process.env.NEXT_PUBLIC_S3_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
});

const cloudFront_url = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL;

const TextEditor = (({ onTextChange, value }: NoticeWriteProps) => {
    const quillRef = useRef<ReactQuill>(null);

    const [editorValue, setEditorValue] = useState(value);

    // 이미지 S3 업로드 후 URL 가져오기
    const imageHandler = async () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.addEventListener("change", async () => {
            const file = input.files?.[0];
            const fileName = file?.name;
            try {
                if (quillRef.current) {
                    const upload = new AWS.S3.ManagedUpload({
                        params: {
                            ACL: "public-read",
                            Bucket: "jisilver-bucket",
                            Key: `upload/${fileName}`,
                            Body: file,
                        },
                    })
                    const url_key = await upload.promise().then((res) => res.Key);

                    const range = quillRef.current?.getEditor().getSelection()?.index;
                    if (range !== null && range !== undefined) {
                        let quill = quillRef.current?.getEditor();
                        quill?.setSelection(range, 1);
                        quill?.clipboard.dangerouslyPasteHTML(
                            range,
                            `<img src="${cloudFront_url}/${url_key}" alt="image" />`

                        );
                    }
                }
            } catch (err) {
                console.log(err)
            }
        })
    }

    // 에디터 모듈
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                    ['link', 'image'],
                    [{ align: [] }],
                    ['clean'],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
        }),
        []
    );

    useEffect(() => {
        setEditorValue(value);
    }, [value]);

    const handleChange = (newValue: string) => {
        setEditorValue(newValue);
        if (onTextChange) {
            onTextChange(newValue);
        }
    };

    return (
        <div className={styles.container}>
            <ReactQuill ref={quillRef} theme="snow" value={editorValue} onChange={handleChange} modules={modules} style={{ height: "430px" }} />
        </div >
    )
})

export default TextEditor
