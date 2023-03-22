import axios from 'axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 5px;
  outline: none;
`;

const CssInput = styled.textarea`
  margin-bottom: 10px;
  font-family: monospace;
  font-size: 14px;
  height: 150px;
  border: 1px solid #ccc;
  padding: 5px;
  outline: none;
`;

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [customCss, setCustomCss] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'},
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const craeteBlog = async()=>{
    axios.post()
  }

  const handleCssChange = (event) => {
    setCustomCss(event.target.value);
  };

  return (
    <form onSubmit={craeteBlog}>
    <Container>
      <TitleInput
        placeholder="Enter blog title"
        value={title}
        className="mb-5 mt-5"
        onChange={handleTitleChange}
      />
      <ReactQuill
        placeholder="Add Your Content here"
        value={content}
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
        className="mb-5"
      />
      <button className='btn w-25 btn-primary'>Create</button>
      <CssInput
        placeholder="Enter custom CSS"
        value={customCss}
        className="mt-5"
        onChange={handleCssChange}
      />
      <style>{customCss}</style>
    </Container>
    </form>
  );
};

export default BlogEditor;
