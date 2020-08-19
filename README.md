configged from scratch with <3

## Content
Boiler includes config for: 

- webpack
- react
- typescript/js full support (.ts, .tsx, .js, .jsx) 
- eslint
- prettier
- asset loading (.png/.jpe?g, .svg, .gif)
- tailwind/postcss/autoprefixer



## note on resolving un-typed third-party packages

> side note about typing files (types.d.ts): the TypeScript compiler will complain when you install a package without its typing files. This is annoying because not all npm packages have typings files, so TypeScript will complain about the module not existing. An easy, albeit hacky way to deal with this is to create an override.d.ts file in /react-typescript-boilerplate/typings and typing: declare module package-with-no-typings-file. This way you will be able to use the package without the IDE complaining, but you won't have types.
