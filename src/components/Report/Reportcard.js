import React, { useRef } from "react";
import { Avatar, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Nav from "react-bootstrap/Nav";
import styled from "styled-components";
import { grey } from "@mui/material/colors";

//Viewer
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

const StyleBox = styled(Box)`
  background: linear-gradient(-45deg, #242f9b 10%, #646fd4 80%);
  border-radius: 10px;
  padding: 1rem;
`;

const Styleli = styled.li`
  color: white;
`;

function Reportcard({ title, writer, date, mac }) {
  const inputmacro = useRef([]);

  return (
    <div>
      <Typography variant="h3" align="center">
        {title}
      </Typography>
      <p />
      <Typography variant="caption" display="block" align="center" gutterBottom>
        {date}
      </Typography>
      <p />

      <Box
        sx={{
          paddingTop: 10,
        }}
      />

      {/* {Table of contents} 시작 */}
      <StyleBox>
        <Typography
          variant="h6"
          align="center"
          sx={{ color: grey[50], marginBottom: "1rem" }}
        >
          목차
        </Typography>
        <div>
          <Nav className="flex-column">
            <Nav.Link
              onClick={() => {
                inputmacro.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {mac.map((ma, index) => (
                <div key={index}>
                  <ul>
                    <Styleli>
                      <Typography variant="body2">{ma.title}</Typography>
                    </Styleli>
                  </ul>
                </div>
              ))}
            </Nav.Link>
          </Nav>
        </div>
      </StyleBox>

      <Box
        sx={{
          paddingTop: 10,
        }}
      />

      {/* {Table of contents}  끝*/}

      {/* {contents} 시작 */}

      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", m: 1 }}
        ref={inputmacro}
      >
        거시경제
      </Typography>
      <Box
        sx={{
          paddingTop: 6,
        }}
      />

      <p />
      <div>
        {mac.map((ma, index) => (
          <div key={index}>
            <p />
            <Typography
              variant="h6"
              align="left"
              gutterBottom
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {ma.title}
            </Typography>
            <p />
            <Viewer initialValue={ma.content} />
            <p />
            <Box
              sx={{
                paddingTop: 3,
              }}
            />
          </div>
        ))}
      </div>
      <Box
        sx={{
          paddingTop: 10,
        }}
      />

      <div>
        <Typography
          variant="subtitle1"
          align="center"
          gutterBottom
          component="div"
          sx={{ textDecoration: "underline" }}
        >
          Credit
        </Typography>
      </div>
      <Typography
        variant="subtitle2"
        align="center"
        gutterBottom
        component="div"
        sx={{ fontWeight: "bold", m: 1 }}
      >
        {writer}
      </Typography>
    </div>
  );
}

export { Reportcard };

function DailyReportcard({ title, writer, date, daily }) {
  return (
    <div>
      <Box
        sx={{
          paddingTop: 10,
        }}
      />
      <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <p />
      <Typography variant="caption" display="block" align="center" gutterBottom>
        {date}
      </Typography>
      <Box
        sx={{
          paddingTop: 10,
        }}
      />
      <Avatar
        alt="thumbnail"
        src={daily.thumbnail}
        variant="square"
        align="center"
        sx={{ width: "35rem", height: "10rem" }}
      />
      <Box
        sx={{
          paddingTop: 10,
        }}
      />
      <div>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {daily.issue1_title}
        </Typography>
        <Box
          sx={{
            paddingTop: 3,
          }}
        />
        <Viewer initialValue={daily.issue1_content} />
        <Box
          sx={{
            paddingTop: 3,
          }}
        />
      </div>
      <Box
        sx={{
          paddingTop: 10,
        }}
      />

      <div>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {daily.issue2_title}
        </Typography>
        <Box
          sx={{
            paddingTop: 3,
          }}
        />
        <Viewer initialValue={daily.issue2_content} />
        <Box
          sx={{
            paddingTop: 3,
          }}
        />
      </div>
      <Box
        sx={{
          paddingTop: 10,
        }}
      />

      <div>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          인사이트
        </Typography>
        <Box
          sx={{
            paddingTop: 3,
          }}
        />
        <Viewer initialValue={daily.insight} />
        <Box
          sx={{
            paddingTop: 3,
          }}
        />
      </div>
      <Box
        sx={{
          paddingTop: 10,
        }}
      />

      <div>
        <Typography
          variant="subtitle1"
          align="center"
          gutterBottom
          component="div"
          sx={{ textDecoration: "underline" }}
        >
          Credit
        </Typography>
      </div>
      <Typography
        variant="subtitle2"
        align="center"
        gutterBottom
        component="div"
        sx={{ fontWeight: "bold", m: 1 }}
      >
        {writer}
      </Typography>
    </div>
  );
}
export { DailyReportcard };
