<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8">
      <v-card class="index">
        <v-card-title class="headline">
          始めに
        </v-card-title>
        <v-card-text>
          <p>
            <strong class="red--text">マンデルブロ集合</strong>とは、聞いたことありますか？下の画像を見て頂ければ
            <strong class="blue--text">「これか」</strong>
            となるかもしれません。
          </p>
          <v-img height="250" src="" alt="マンデルブロ集合全体像" />
          <p>
            本ページでは、このマンデルブロ集合についての紹介、説明、および実際に動かせる環境を提供します。
          </p>
          <p>
            \begin{align}
            \dot{x} &amp; = \sigma(y-x) \\
            \dot{y} &amp; = \rho x - y - xz \\
            \dot{z} &amp; = -\beta z + xy
            \end{align}
          </p>
          <p>
            マテリアルマンデルブロ集合
          </p>
          <hr class="my-3">
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/inspire"
          >
            次へ<span class="d-none d-sm-block">（マンデルブロ集合とは）</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {
  },
  method: {
  },
  mounted () {
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
</script>

<style scoped>
.index{
  font-size: 1rem;
}
</style>
