const { cdk, javascript } = require('projen');

const project = new cdk.JsiiProject({
  authorName: 'org-formation',
  authorOrganization: true,
  name: '@org-formation/cfn-rpdk',
  defaultReleaseBranch: 'main',
  repository: 'https://github.com/org-formation/cloudformation-cli-typescript-plugin.git',
  packageManager: javascript.NodePackageManager.NPM,
  // devDeps: [
  //   // 'aws-sdk@^2.712.0',
  //   // 'projen@^0.18.13',
  // ],
  deps: [
    '@org-formation/tombok@^0.0.1',
    'autobind-decorator@^2.4.0',
    'class-transformer@^0.3.1',
    'reflect-metadata@^0.1.13',
    'string.prototype.replaceall@^1.0.3',
    'uuid@^7.0.2',
  ],
  peerDeps: [
    // '@org-formation/tombok@^0.0.1',
    // 'autobind-decorator@^2.4.0',
    // 'aws-sdk@^2.712.0',
    // 'class-transformer@^0.3.1',
    // 'reflect-metadata@^0.1.13',
    // 'string.prototype.replaceall@^1.0.3',
    // 'uuid@^7.0.2',
  ],
  // bundledDependencies: [
  //   '@org-formation/tombok@^0.0.1',
  //   'autobind-decorator@^2.4.0',
  //   'class-transformer@^0.3.1',
  //   'reflect-metadata@^0.1.13',
  //   'string.prototype.replaceall@^1.0.3',
  //   'uuid@^7.0.2',
  // ],
  tsconfig: {
    compilerOptions: {
      target: 'ES2020',
      "noImplicitAny": false,
      "strictNullChecks": false,
      "strictPropertyInitialization": false,
    }
  },
  publishToGo: {
    moduleName: 'cfn-rpdk',
  },
  // publishToMaven: {
  //   javaPackage: 'software.amazon.cloudformation.rpdk',
  //   mavenGroupId: 'software.amazon.cloudformation',
  //   mavenArtifactId: 'cfn-rpdk',
  // },
  publishToPypi: {
    distName: 'cfn-rpdk',
    module: 'cfn_rpdk',
  },
  release: false,
});

project.addBundledDeps(...[
  '@org-formation/tombok@^0.0.1',
  'autobind-decorator@^2.4.0',
  'class-transformer@^0.3.1',
  'reflect-metadata@^0.1.13',
  'string.prototype.replaceall@^1.0.3',
  'uuid@^7.0.2',
]);

project.gitignore.exclude("tsconfig.json");

project.synth();
