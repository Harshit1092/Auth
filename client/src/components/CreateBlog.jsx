
import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertFromHTML, convertToHTML } from 'draft-convert';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { stateToHTML } from 'draft-js-export-html';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState(EditorState.createEmpty());

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleContentChange = (editorState) => {
        setContent(editorState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const htmlContent = stateToHTML(content.getCurrentContent());
        // const htmlContent = convertToHTML(rawContentState);
        // Handle form submission here
        // send the blog data to the server
        const blogData = {
            title,
            description,
            content: htmlContent,
        };

        // console.log(content.getCurrentContent().getPlainText());
    };

    return (
        <>
        <Navbar />
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 mt-2 text-indigo-600">Create Blog</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                        value={description}
                        onChange={handleDescriptionChange}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
                        Content
                    </label>
                    <Editor
                        editorState={content}
                        onEditorStateChange={handleContentChange}
                        wrapperClassName="border border-gray-300 rounded focus:border-indigo-500"
                        toolbar={{
                            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                            inline: {
                                options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
                            },
                            blockType: {
                                options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                            },
                            fontSize: {
                                options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                                className: 'bordered-option-classname',
                                dropdownClassName: 'bordered-dropdown-classname',
                            },
                            fontFamily: {
                                options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                                className: 'bordered-option-classname',
                                dropdownClassName: 'bordered-dropdown-classname',
                            },
                        }}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                >
                    Post Blog
                </button>
            </form>
        </div>
        <Footer />
        </>
    );
};

export default CreateBlog;
