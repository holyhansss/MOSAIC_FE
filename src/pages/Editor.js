import React, { useRef } from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Container, Grid } from "@mui/material";
import styled from "styled-components";


const MainContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

function AdminEditor() {
    const editorRef = useRef();

    const handleRegisterButton= (e) => {
        const data = editorRef.current.getInstance().getMarkdown();
        console.log(data);
      };

  return (
            <div>
                <MainContainer maxWidth="md">
                    <Grid container spacing={-10}>
                        <Editor
                        ref={editorRef}
                        initialValue="내용을 입력하시오"
                        previewStyle="vertical"
                        height="1000px"
                        initialEditType="WYSIWYG"
                        useCommandShortcut={false}
                        hideModeSwitch={true}
                        toolbarItems={[
                            // 툴바 옵션 설정
                            ['heading', 'bold', 'italic', 'strike'],
                            ['hr', 'quote'],
                            ['ul', 'ol', 'task', 'indent', 'outdent'],
                            ['table', 'image', 'link'],
                            ['code', 'codeblock']
                          ]}
                        />
                    </Grid>
                </MainContainer>
                <button onClick={handleRegisterButton}>등록</button>            
            </div>
        )
    };

  export default AdminEditor;