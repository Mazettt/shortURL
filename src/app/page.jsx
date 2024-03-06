"use client"

import Image from "next/image";
import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Container, CssBaseline, Stack, TextField, Typography } from "@mui/material";

export default function Home() {
  const [url, setUrl] = React.useState("");
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const getShortUrl = async () => {
    if (!url) return;
    setError("");

    try {
      const response = await fetch(`/api/short?url=${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      console.log(data);
      setResult(data.newurl);
      setUrl("");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ height: '100vh', marginTop: '20px' }} display={"flex"} flexDirection={"column"} gap={4}>
          <Typography variant="h1" gutterBottom>Short URL</Typography>
          {error && <Typography variant="body1" color="error">Error: {error}</Typography>}
          {result &&
            <>
              <div>
                <Typography variant="subtitle2">Your shortened URL:</Typography>
                <Stack direction="row" justifyContent={"space-between"}>
                  <TextField
                    variant="outlined"
                    value={result}
                    type="url"
                    fullWidth
                  />
                  <Button variant="outlined" onClick={() => {
                    navigator.clipboard.writeText(result);
                    setCopied(true);
                  }}>
                    {copied ? <CheckCircleIcon /> : 'Copy'}
                  </Button>
                </Stack>
              </div>
              <Button variant="contained" onClick={() => { setResult(""); }}>Shorten another url</Button>
            </>
          ||
            <>
              <TextField
                label="Url"
                helperText="Enter the URL you want to shorten"
                variant="outlined"
                value={url}
                type="url"
                fullWidth
                onChange={(event) => {
                  setUrl(event.target.value);
                }}
              />
              <Button variant="contained" onClick={getShortUrl}>Get URL</Button>
            </>
          }
        </Box>
      </Container>
    </>
  );
}
