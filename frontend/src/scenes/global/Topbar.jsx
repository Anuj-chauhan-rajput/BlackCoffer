import React from "react";
import { Box, IconButton, Button } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../../theme";

const Topbar = ({ setIsSidebar }) => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box>
        {/* Logo or menu button */}
      </Box>

      <Box display="flex" alignItems="center">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <DarkModeOutlined /> : <LightModeOutlined />}
        </IconButton>

        {/* ✅ Logout Button */}
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          variant="outlined"
          color="error"
          sx={{ ml: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
