const { src, watch } = require("gulp");
const clean = require("gulp-clean");
const pkg = require("./package.json");
const rollup = require("rollup");
const rollupTypescript = require("rollup-plugin-typescript");

const inputs = {
  list: "src/list.ts",
  treenode: "src/treenode.ts"
};

function dev() {
  return rollup
    .rollup({
      input: inputs,
      plugins: [rollupTypescript()]
    })
    .then(bundle => {
      return bundle.write({
        sourcemap: true,
        dir: "dist",
        format: "cjs"
      });
    });
}

async function build() {
  // await src("dist/**", { read: false }).pipe(clean());
  for (let key in inputs) {
    const value = inputs[key];
    await rollup
      .rollup({
        input: value,
        plugins: [rollupTypescript()]
      })
      .then(bundle => {
        return bundle.write({
          name: key,
          dir: "dist",
          format: "umd",
          banner: "/* dslib.js version " + pkg.version + " */",
          footer: "/* follow me on Twitter! @rich_harris */"
        });
      });
  }
}

function watchSrc() {
  dev();
  watch("./src/**", dev);
}

exports.watch = watchSrc;
exports.build = build;
