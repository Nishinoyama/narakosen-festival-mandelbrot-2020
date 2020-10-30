<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="10">
      <v-card class="index">
        <v-card-title class="headline">
          始めに
        </v-card-title>
        <v-card-text>
          <p class="d-sm-none">
            <strong>
              ※生成画像が大きいため、PCでの閲覧を推奨します。
            </strong>
          </p>
          <p>
            <strong class="red--text">マンデルブロ集合</strong>とは、聞いたことありますか？下の画像を見て頂ければ
            <strong class="blue--text">「これか」</strong>
            となるかもしれません。
          </p>
          <div class="text-center">
            <canvas id="mandelbrot_sample" width="512" height="512" />
          </div>
          <p>
            この画像はたった今計算によって生成されたものです。
          </p>
          <p>
            本展示では、このマンデルブロ集合についての紹介、説明、および実際にこのマンデルブロ集合を動かせる環境を提供します。
          </p>
          <hr class="my-3">
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/description"
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
    this.LaTexRenderer()
    this.createMandelbrot(2.6, -2.1, -1.3)
  },
  methods: {
    createMandelbrot (range, dx, dy) {
      const cv = document.getElementById('mandelbrot_sample')
      if (cv.getContext && cv.getContext('2d').createImageData) {
        const size = 512
        const context = cv.getContext('2d')
        const imgData = context.createImageData(size, size)
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            let t = this.calcMandelbrot(j / size * range + dx, i / size * range + dy, 0x100)
            if (t === 0x100) {
              imgData.data[i * imgData.width * 4 + j * 4] = 0
              imgData.data[i * imgData.width * 4 + j * 4 + 1] = 0
              imgData.data[i * imgData.width * 4 + j * 4 + 2] = 0
            } else {
              t = t % 0x60
              if (t < 0x20) {
                // 藍->白
                imgData.data[i * imgData.width * 4 + j * 4] = t * 0x8
                imgData.data[i * imgData.width * 4 + j * 4 + 1] = t * 0x8
                imgData.data[i * imgData.width * 4 + j * 4 + 2] = 0xC0 + t * 0x2
              } else if (t < 0x40) {
                // 白->橙
                t = t % 0x20
                imgData.data[i * imgData.width * 4 + j * 4] = 0xFF - t * 2
                imgData.data[i * imgData.width * 4 + j * 4 + 1] = 0xFF - t * 4
                imgData.data[i * imgData.width * 4 + j * 4 + 2] = 0xFF - t * 8
              } else {
                // 橙->藍
                t = t % 0x20
                imgData.data[i * imgData.width * 4 + j * 4] = 0xBF - t * 6
                imgData.data[i * imgData.width * 4 + j * 4 + 1] = 0x7F - t * 4
                imgData.data[i * imgData.width * 4 + j * 4 + 2] = t * 5
              }
            }
            imgData.data[i * imgData.width * 4 + j * 4 + 3] = 255
          }
        }
        context.putImageData(imgData, 0, 0)
      }
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
