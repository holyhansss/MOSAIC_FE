import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Nav from "react-bootstrap/Nav";
import styled from "styled-components";
import { grey } from "@mui/material/colors";

const StyleBox = styled(Box)`
  background: linear-gradient(-45deg, #1a1a40 5%, #270082 90%);
  border-radius: 10px;
`;

const Styleli = styled.li`
  color: white;
`;

function Reportcard({ title, writer, date, inve, poli, mac, insi }) {
  const inputinvest = useRef([]);
  const inputmacro = useRef([]);
  const inputpolicy = useRef([]);
  const inputinsight = useRef([]);

  return (
    <div>
      <Box
        sx={{
          position: "fixed",
          top: 160,
          left: 15,
          width: 1 / 6,
          whiteSpace: "normal",
        }}
      >
        <div>
          <Nav className="flex-column">
            <Nav.Link
              onClick={() => {
                inputinvest.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Typography variant="subtitle2" sx={{ color: grey[50] }}>
                거시경제
              </Typography>
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                inputpolicy.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Typography variant="subtitle2" sx={{ color: grey[50] }}>
                크립토 규제/정책
              </Typography>
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                inputmacro.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Typography variant="subtitle2" sx={{ color: grey[50] }}>
                크립토 기술/투자 이슈
              </Typography>
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                inputinsight.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Typography variant="subtitle2" sx={{ color: grey[50] }}>
                인사이트
              </Typography>
            </Nav.Link>
          </Nav>
        </div>
      </Box>

      {/* {contents} */}
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

      {/* {Table of contents} */}
      <StyleBox>
        <Typography variant="h6" align="center">
          목차
        </Typography>
        <div>
          <Nav className="flex-column">
            <Nav.Link
              onClick={() => {
                inputinvest.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Typography
                variant="body1"
                sx={{ paddingBottom: "5px", color: grey[50] }}
              >
                거시경제
              </Typography>
              {inve.map((invem, index) => (
                <div key={index}>
                  <ul>
                    <Styleli>
                      <Typography variant="body2">{invem.title}</Typography>
                    </Styleli>
                  </ul>
                </div>
              ))}
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                inputpolicy.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Typography
                variant="body1"
                sx={{ paddingBottom: "5px", color: grey[50] }}
              >
                크립토 규제/정책
              </Typography>
              {poli.map((polic, index) => (
                <div key={index}>
                  <ul>
                    <Styleli>
                      <Typography variant="body2">{polic.title}</Typography>
                    </Styleli>
                  </ul>
                </div>
              ))}
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                inputmacro.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Typography
                variant="body1"
                sx={{ paddingBottom: "5px", color: grey[50] }}
              >
                크립토 기술/투자 이슈
              </Typography>
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
            <Nav.Link
              onClick={() => {
                inputinsight.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Typography
                variant="body1"
                sx={{ paddingBottom: "5px", color: grey[50] }}
              >
                인사이트
              </Typography>
            </Nav.Link>
          </Nav>
        </div>
      </StyleBox>

      <Box
        sx={{
          paddingTop: 10,
        }}
      />

     {/* {Table of contents} */}




    {/* {contents} */}

      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", m: 1 }}
        ref={inputinvest}
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
        {inve.map((invem, index) => (
          <div key={index}>
            <p />
            <Typography
              variant="h6"
              align="left"
              gutterBottom
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {invem.title}
            </Typography>
            <p />
            <Typography
              variant="body1"
              align="left"
              gutterBottom
              component="div"
              sx={{lineHeight: 2, letterSpacing: 0.25}}
            >
              {invem.content}
            </Typography>
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

      <p />
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", m: 1 }}
        ref={inputpolicy}
      >
        크립토 규제/정책
      </Typography>
      <Box
        sx={{
          paddingTop: 6,
        }}
      />

      <p />
      <div>
        {poli.map((polic, index) => (
          <div key={index}>
            <p />
            <Typography
              variant="h6"
              align="left"
              gutterBottom
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {polic.title}
            </Typography>
            <p />
            <Typography
              variant="body1"
              align="left"
              gutterBottom
              component="div"
              sx={{lineHeight: 2, letterSpacing: 0.25}}
            >
              {polic.content}
            </Typography>
            <p />
            <Box
              sx={{
                paddingTop: 3,
              }}
            />
          </div>
        ))}
      </div>
      <p />

      <Box
        sx={{
          paddingTop: 10,
        }}
      />

      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", m: 1 }}
        ref={inputmacro}
      >
        크립토 기술/투자 이슈
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
              variant="body1"
              align="left"
              gutterBottom
              component="div"
              sx={{lineHeight: 2, letterSpacing: 0.25}}
            >
              {ma.content}
            </Typography>
            <p />
            <Box
              sx={{
                paddingTop: 3,
              }}
            />
          </div>
        ))}
      </div>
      <p />
      <Box
        sx={{
          paddingTop: 10,
        }}
      />
<Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", m: 1 }}
        ref={inputinsight}
      >
        인사이트
      </Typography>

      <Box
        sx={{
          paddingTop: 6,
        }}
      />

      <p />
      <div>
        {insi.map((ins, index) => (
          <div key={index}>
            <p />
            <Typography
              variant="body1"
              align="left"
              gutterBottom
              component="div"
              sx={{lineHeight: 2, letterSpacing: 0.25}}
            >
              {ins.content}
            </Typography>
            <p />
            <Box
              sx={{
                paddingTop: 3,
              }}
            />
          </div>
        ))}
      </div>
      <p />
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

export default Reportcard;
