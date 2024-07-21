import { Box, List, ListItem } from "@mui/material";
import { colors } from "@/constants";
import { CustomText } from "../components";
import { navListNoUser, navListWithUser } from "./utils/nav-list";
import ComputerIcon from "@mui/icons-material/Computer";
import Link from "next/link";
export function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "5px",
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <CustomText
          textColor="black"
          textSize="textLg"
          style={{ fontWeight: "bold" }}
        >
          NbDev
        </CustomText>
        <ComputerIcon />
      </Box>
      <List component="nav" sx={{ display: "flex" }}>
        {navListNoUser.map((link) => (
          <ListItem key={link.id}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <CustomText textColor="black" textSize="textMd">
                {link.name}
              </CustomText>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
