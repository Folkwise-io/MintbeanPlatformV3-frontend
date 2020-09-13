// https://jasonraimondi.com/posts/testing-a-typescript-react-app-using-ts-jest-not-create-react-app/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/fileMock.ts",
    "\\.(css|pcss)$": "<rootDir>/test/styleMock.ts",
  },
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.{ts,js}", "!src/**/*.d.ts"],
};
