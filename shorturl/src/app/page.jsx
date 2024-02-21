"use client"

import Image from "next/image";
import React from "react";
import { Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";

export default function Home() {
  const [url, setUrl] = React.useState("");

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ height: '100vh' }}>
          <Typography variant="h1" gutterBottom>Short URL</Typography>
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
          <Button variant="contained">Get URL</Button>
        </Box>
      </Container>
    </>
  );
}
