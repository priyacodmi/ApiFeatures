import { Paper, Button } from "@mui/material";

function Item({ item }) {
  return (
    <Paper>
      <img
        src={item.image}
        alt={item.id}
        style={{ width: "100%", height: "90vh" }}
      />
    </Paper>
  );
}
export default Item;
