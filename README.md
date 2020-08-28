## Resources

[The Ultimate React-Redux-Typescript Cheatsheet](https://github.com/piotrwitek/react-redux-typescript-guide)

## note on resolving un-typed third-party packages

> side note about typing files (types.d.ts): the TypeScript compiler will complain when you install a package without its typing files. This is annoying because not all npm packages have typings files, so TypeScript will complain about the module not existing. An easy, albeit hacky way to deal with this is to create an override.d.ts file in /react-typescript-boilerplate/typings and typing: declare module package-with-no-typings-file. This way you will be able to use the package without the IDE complaining, but you won't have types.
