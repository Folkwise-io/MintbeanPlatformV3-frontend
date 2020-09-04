// must include module declaration for each asset type
// allows import statements like below:
// import logo from "../assets/logo.png";

declare module "*.png" {
  const value: string;
  export = value;
}
//
// declare module "*.jpg" {
//   const value: any;
//   export = value;
// }
// declare function require(path: string);
