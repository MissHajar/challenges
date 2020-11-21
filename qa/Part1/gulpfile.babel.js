const {
  task, src, dest, watch, parallel, series,
} = require('gulp');

const eslint = require('gulp-eslint');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const testcafe = require('gulp-testcafe');

const current = new Date();
const cDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
const cTime = `${current.getHours()}h${current.getMinutes()}.${current.getSeconds()}`;

const headlessBrowsers = [
  'edge:headless',
  'chrome:headless',
  'firefox:headless',
  'opera:headless',
  'edge-legacy:headless',
];
const screenShotsBrowsers = [
  'edge-legacy',
  'ie',
  'safari'];

const appleEmulatedDevice = [
  'chrome:headless:emulation:device=iphoneX',
  'chrome:headless:emulation:device=iphone5',
  'chrome:headless:emulation:device=iphone678',
  'chrome:headless:emulation:device=iphone678plus',
  'chrome:headless:emulation:device=ipad',
  'chrome:headless:emulation:device=ipadpro',
];
const androidEmulatedDevice = [
  'chrome:headless:emulation:device=galaxyfold',
  'chrome:headless:emulation:device=galaxys5',
  'chrome:headless:emulation:device=nexus6',
  'chrome:headless:emulation:device=nexus10',
];

// Lint
task('lint', () => src(['./**/*.js', '!./node_modules/**'])
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format(process.env.ESLINT_FORMATTER)),
  // .pipe(eslint.failAfterError());
);

task('concat', () => src(['**/*.js', '!./node_modules/**'])
  .pipe(concat({ path: 'consentNotice.js' }))
  .pipe(dest('./dist')));

task('minify', () => src(['**/*.js', '!./node_modules/**'])
  .pipe(minify({
    ext: {
      src: 'consentNotice.js',
      min: 'consentNotice-min.js',
      ignoreFiles: ['-min.js'],
    },
  }))
  .pipe(dest('./dist')));

// Transcompile / Polyfill
task('build', () => src(['./**/*.js', './**/*.json', '!./node_modules/**'])
  .pipe(concat('./consentNotice.js'))
  .pipe(babel({
    plugins: ['@babel/transform-runtime'],
  }))
  .pipe(dest('./dist')));

// rebuild on fly if changes
task('watch', () => {
  watch(['./**/*.js', '!./node_modules/**'], ['lint', 'build']);
});

task('runtests', () => {
  src('./e2e_tests/*.js')
    .pipe(testcafe({
      browsers: screenShotsBrowsers,
      reporter: {
        name: 'st-html',
        output: `reports/${cDate}/Report-${cTime}.html`,
        takeScreenshotsOnFail: true,
        screenshotsPath: `reports/${cDate}/screenshots/`,
        screenshotsPathPattern: `error-${cTime}.png`,
        skipJsErrors: true,
      },
    }));
});

task('runheadlesstests', () => {
  src('./e2e_tests/*.js')
    .pipe(testcafe({
      browsers: headlessBrowsers,
      reporter: {
        name: 'st-html',
        output: `reports/${cDate}/headlessReport-${cTime}.html`,
      },
    }));
});

task('runappletests', () => {
  src('./e2e_tests/*.js')
    .pipe(testcafe({
      browsers: appleEmulatedDevice,
      reporter: {
        name: 'st-html',
        output: `reports/${cDate}/appleReport-${cTime}.html`,
      },
    }));
});

task('runandroidtests', () => {
  src('./e2e_tests/*.js')
    .pipe(testcafe({
      browsers: androidEmulatedDevice,
      reporter: {
        name: 'st-html',
        output: `reports/${cDate}/androidReport-${cTime}.html`,
      },
    }));
});

task('init', series('lint', 'concat', 'minify', 'build'));

task('runDesktopTests', parallel('runheadlesstests', 'runtests'));
task('runMobileTests', parallel('runappletests', 'runandroidtests'));
task('runAllTests', parallel('runheadlesstests', 'runtests', 'runappletests', 'runandroidtests'));
