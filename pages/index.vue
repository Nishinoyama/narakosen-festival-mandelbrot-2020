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
          <div class="text-center">
            <canvas id="mandelbrot_sample" width="512" height="512" />
          </div>
          <p>
            本ページでは、このマンデルブロ集合についての紹介、説明、および実際に動かせる環境を提供します。
          </p>
          <p>
            \begin{align}
            x &amp; \rightarrow x^2 - y^2 + c_x\\
            y &amp; \rightarrow 2xy + c_y
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
    function calcX (xx, yy, x) {
      return xx * xx - yy * yy + x
    }
    function calcY (xx, yy, y) {
      return 2 * xx * yy + y
    }
    function abs2 (x, y) {
      return Math.sqrt(x * x + y * y)
    }
    function calcMandelbrot (x, y) {
      let xx = 0
      let yy = 0
      let tx = 0
      let ty = 0
      let i
      for (i = 0; i < 64; i++) {
        tx = calcX(xx, yy, x)
        ty = calcY(xx, yy, y)
        if (abs2(tx, ty) > 4) {
          break
        }
        xx = tx
        yy = ty
      }
      return i
    }
    const cv = document.getElementById('mandelbrot_sample')
    if (cv.getContext && cv.getContext('2d').createImageData) {
      const context = cv.getContext('2d')
      const imgData = context.createImageData(512, 512)
      for (let i = 0; i < 512; i++) {
        for (let j = 0; j < 512; j++) {
          const t = calcMandelbrot(j / 512 * 2.6 - 2.1, i / 512 * 2.6 - 1.3)
          if (t < 42) {
            imgData.data[i * imgData.width * 4 + j * 4] = t * 6
            imgData.data[i * imgData.width * 4 + j * 4 + 1] = t * 6
            imgData.data[i * imgData.width * 4 + j * 4 + 2] = 255
          } else if (t < 64) {
            imgData.data[i * imgData.width * 4 + j * 4] = 255 - t * 3
            imgData.data[i * imgData.width * 4 + j * 4 + 1] = 255 - t * 6
            imgData.data[i * imgData.width * 4 + j * 4 + 2] = 255 - t * 6
          } else {
            imgData.data[i * imgData.width * 4 + j * 4] = 0
            imgData.data[i * imgData.width * 4 + j * 4 + 1] = 0
            imgData.data[i * imgData.width * 4 + j * 4 + 2] = 0
          }
          imgData.data[i * imgData.width * 4 + j * 4 + 3] = 255
        }
      }
      context.putImageData(imgData, 0, 0)
    }
  }
}
</script>

<style scoped>
canvas{
  margin: auto;
  border: 2px solid #35495e;
}
</style>
