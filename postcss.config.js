module.exports = {
  plugins: {
    // ===========================================
    // POSTCSS PLUGINS CONFIGURATION
    // ===========================================

    // Autoprefixer - Add vendor prefixes automatically
    autoprefixer: {
      grid: true,
      flexbox: true,
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead',
        'not ie 11'
      ]
    },

    // CSSNano - Minify CSS in production
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: 'default'
      }
    } : {}),

    // PostCSS Import - Handle @import statements
    'postcss-import': {},

    // PostCSS Nested - Enable nested CSS syntax
    'postcss-nested': {},

    // PostCSS Preset Env - Future CSS features
    'postcss-preset-env': {
      stage: 2,
      autoprefixer: false,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'media-query-ranges': true,
        'logical-properties-and-values': true,
        'gap-properties': true
      },
      preserve: true
    }
  }
};
