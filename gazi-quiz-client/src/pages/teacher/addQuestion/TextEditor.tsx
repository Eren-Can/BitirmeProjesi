import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from 'quill-image-resize-module-react'; 

Quill.register('modules/imageResize', ImageResize);

import './editor.css'
import AddQuestionRequest from "../../../models/question/request/AddQuestionRequest";

interface TextEditorProps {
    values: AddQuestionRequest;
}

const TextEditor = ({values}: TextEditorProps) => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
        ],
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize'],
        },
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
    ];

    const handleValue = (value: string) => values.content = value;

    return (
        <ReactQuill
            theme='snow'
            onChange={(value) => handleValue(value)}
            modules={modules}
            formats={formats}
            value={values.content}
        />
    );
};

export default TextEditor;
