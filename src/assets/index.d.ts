// must include module declaration for each asset type
// allows import statements like below:
// import logo from "../assets/logo.png";

declare module "*.png";

declare module "*.jpg";

declare module "*.jpeg";

declare module "*.svg";

// declare function require(path: string);

// KEEP for reference - this was initial syntax
// declare module "*.png" {
//   const value: string;
//   export = value;
// }
