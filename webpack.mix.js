let mix = require('laravel-mix')

mix.js(`src/js/main.js`, `js/get-in-line.js`)
.version()
.setPublicPath(`.`)
