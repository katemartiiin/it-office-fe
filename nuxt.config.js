const dev = process.env.DEV_API
const prod = process.env.PROD_API
const api = process.env.NODE_ENV === 'development' ? dev : prod

export default {
  tailwindcss: {
    jit: true,
    // add '~tailwind.config` alias
    exposeConfig: true,
  },
  colorMode: {
    classSuffix: '',
  },
  publicRuntimeConfig: {
    api: api,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '%s | CGOMALOLOS CITY',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.ico' }],
    link: [
      // {
      //   rel: 'stylesheet',
      //   type: 'text/css',
      //   href: 'https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css',
      // },
    ],
    script: [
      // {
      //   src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js',
      //   type: 'text/javascript',
      // },
      // {
      //   src: 'https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js',
      //   type: 'text/javascript',
      // },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@fortawesome/fontawesome-free/css/all.min.css'],
  // '@/assets/css/main.css',
  // '@fortawesome/fontawesome-free/css/all.min.css',
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: './plugins/echo', mode: 'client' },
    { src: '~/plugins/vue-good-table', ssr: false },
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    'nuxt-bowser',
    '@nuxt/postcss8',
  ],
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode',
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    // ['nuxt-tailvue', {modal: true}],
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  env: {
    API_URL: api,
  },

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: api,
        endpoints: {
          login: {
            url: '/api/login',
          },
          logout: {
            url: '/api/logout',
          },
        },
      },
      // cookie: {
      //   name: 'XSRF-TOKEN',
      // },
      // tokenRequired: false,
      // tokenType: false,
    },
    redirect: {
      login: '/',
      logout: '/',
      home: '/dashboard',
    },
    // Options
    // autoLogout: false,
    // localStorage: false,
  },
  axios: {
    baseURL: api,
    credentials: true,
    // proxy: true,
  },
  toast: {
    position: 'top-right',
    duration: 3000,
  },
  proxy: {
    '/api': {
      target: api,
      pathRewrite: { '^/api': '/' },
    },
  },

  ssr: true,
  // router: {
  //   middleware: ['auth'],
  // },
}
