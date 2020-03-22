import React from "react";
import { Input, MenuItem, Select } from "@material-ui/core";

export default class HeaderBar extends React.Component {
  render() {
    return (
      <div>
        <div style={{ padding: 10, display: "flex", flexDirection: "row" }}>
          <div>Repurpose</div>
          <Input placeholder="Search for anything" />
          <Select defaultValue={"All Categories"}>
            <MenuItem value={"All Categories"}>All Categories</MenuItem>
            <MenuItem value={"Antiques"}>Antiques</MenuItem>
            <MenuItem value={"Art"}>Art</MenuItem>
            <MenuItem value={"Baby"}>Baby</MenuItem>
            <MenuItem value={"Books"}>Books</MenuItem>
            <MenuItem value={"Cameras & Photo"}>{"Cameras & Photo"}</MenuItem>
            <MenuItem value={"Cell Phones & Accessories"}>
              {"Cell Phones & Accessories"}
            </MenuItem>
            <MenuItem value={"Clothing, Shoes, & Accessories"}>
              {"Clothing, Shoes, & Accessories"}
            </MenuItem>
            <MenuItem value={"Coins & Paper Money"}>
              {"Coins & Paper Money"}
            </MenuItem>
            <MenuItem value={"Collectibles"}>Collectibles</MenuItem>
            <MenuItem value={"Computers & Tablets"}>
              {"Computers & Tablets"}
            </MenuItem>
            <MenuItem value={"Consumer Electronics"}>
              Consumer Electronics
            </MenuItem>
            <MenuItem value={"Crafts / Arts & Crafts"}>
              {"Crafts / Arts & Crafts"}
            </MenuItem>
            <MenuItem value={"Dolls & Bears"}>{"Dolls & Bears"}</MenuItem>
            <MenuItem value={"Gift Cards & Coupons"}>
              {"Gift Cards & Coupons"}
            </MenuItem>
            <MenuItem value={"Health & Beauty"}>{"Health & Beauty"}</MenuItem>
            <MenuItem value={"Home & Garden"}>{"Home & Garden"}</MenuItem>
            <MenuItem value={"Jewelry & Watches"}>
              {"Jewelry & Watches"}
            </MenuItem>
            <MenuItem value={"Musical Instruments & Gear"}>
              {"Musical Instruments & Gear"}
            </MenuItem>
            <MenuItem value={"Pet Supplies"}>{"Pet Supplies"}</MenuItem>
            <MenuItem value={"Pottery & Glass"}>{"Pottery & Glass"}</MenuItem>
            <MenuItem value={"Sporting Goods"}>{"Sporting Goods"}</MenuItem>
            <MenuItem value={"Toys & Hobbies"}>{"Toys & Hobbies"}</MenuItem>
            <MenuItem value={"Everything Else"}>{"Everything Else"}</MenuItem>
          </Select>
        </div>
      </div>
    );
  }
}
