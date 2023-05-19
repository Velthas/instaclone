// These declarations are to allow for importing of images
declare module "*.png" {
  const path: string;
  export default path;
}

declare module "*.svg" {
  const path: string;
  export default path;
}

declare module "*.jpg" {
  const path: string;
  export default path;
}

declare module "*.gif" {
  const path: string;
  export default path;
}