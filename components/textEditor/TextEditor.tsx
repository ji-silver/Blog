'use client'
import React, { useEffect, useMemo, useState, useRef } from 'react';
import AWS from 'aws-sdk';
import ReactQuill from 'react-quill';
import { NoticeWriteProps } from '@/types';
import 'react-quill/dist/quill.snow.css';
import styles from './textEditor.module.scss'
import { useImage } from '@/context/ImageContext';


AWS.config.update({
    region: process.env.NEXT_PUBLIC_S3_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
});

const cloudFront_url = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL;

const TextEditor = (({ onTextChange, value }: NoticeWriteProps) => {
    const quillRef = useRef<ReactQuill>(null);
    const [editorValue, setEditorValue] = useState(value);
    const { setImageUrl, imageUrl } = useImage();

    // 이미지 S3 업로드 후 URL 가져오기
    const imageHandler = async () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.addEventListener("change", async () => {
            const file = input.files?.[0];
            const fileName = file?.name; // 파일 이름 사용
            // AWS S3 업로드
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
                    // 업로드 완료 시 업로드 된 이미지 S3 키 얻어오기
                    const url_key = await upload.promise().then((res) => res.Key);

                    // Quill 에디터에서 현재 커서 위치 (range) 가져와서 커서 위치에 이미지 삽입
                    const range = quillRef.current?.getEditor().getSelection()?.index;
                    if (range !== null && range !== undefined) {
                        let quill = quillRef.current?.getEditor();
                        quill?.setSelection(range, 1);
                        quill?.clipboard.dangerouslyPasteHTML(
                            range,
                            `<img src="${cloudFront_url}/${url_key}" alt="image" />`
                        );

                        setImageUrl(`${cloudFront_url}/${url_key}`);
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
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' },],
                    ['link', 'image'],
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
