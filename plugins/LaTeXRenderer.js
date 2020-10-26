import Vue from 'vue'

Vue.mixin({
  methods: {
    LaTexRenderer () {
      if (window.MathJax) {
        window.MathJax.Hub.Config({
          tex2jax: {
            inlineMath: [['$', '$']],
            displayMath: [['$$', '$$']],
            processEscapes: true,
            processEnvironments: true
          },
          displayAlign: 'center',
          'HTML-CSS': { fonts: ['TeX'] }
        })
        window.MathJax.Hub.Rerender([
          'Typeset',
          window.MathJax.Hub
        ])
      }
    }
  }
})
