import { makeStyles, fade } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "inline-block",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    width: "100%",
    height: "24px",
    padding: "8px 16px",
    background: "gray",
    borderRadius: "60px",
    display: "flex",
    maxWidth: "300px",
  },
  textField: {
    "& .MuiInputBase-root": {
      height: 24,
      borderColor: "none",
      color: "white",
    },
  },
  input: {
    background: "transparent",
    flex: 1,
    border: 0,
    padding: "16px 12px",
    boxSizing: "border-box",
  },
}));
