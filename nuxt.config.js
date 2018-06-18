module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'photographers',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },

  // router: {
  //   middleware: ['auth']
  // },

  // auth: {
  //   redirect: {
  //     login: '/auth/login',
  //     logout: '/auth/login',
  //     callback: '/auth/login',
  //     user: '/auth/login'
  //   }
  // },

  css: [{
      src: "~/assets/css/main.scss",
      lang: "scss"
    },
    {
      src: 'element-ui/lib/theme-chalk/index.css'
    },
    {
      src: "font-awesome/scss/font-awesome.scss",
      lang: "scss"
    }
  ],

  env: {
    baseUrl: process.env.BASE_URL || 'http://photographers.test/api',
    baseImgUrl: process.env.BASE_IMG_URL || 'http://photographers.test/public/storage/images/'
  },

  plugins: [
    '~/plugins/vee-validate',
    '~/plugins/helper',
    '~/plugins/element'
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    vendor: ['isomorphic-fetch', 'vee-validate', 'element-ui', 'moment'],
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    }
  }
}
