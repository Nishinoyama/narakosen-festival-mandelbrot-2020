<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <v-card class="headline">
        <v-card-title>
          マンデルブロ集合シミュレーター
        </v-card-title>
        <v-card-text>
          <p>
            マンデルブロ集合の旅をお楽しみください。
          </p>
          <p>
            倍率:{{ 2.6/range }}倍
            左上の座標:({{ dx }}, {{ dy }})
            計算数上限:{{ depth }}回
          </p>
          <div class="text-center">
            <canvas id="mandelbrot_edit" width="512" height="512" />
          </div>
          <v-btn color="error" @click="range=2.6; dx=-2.1; dy=-1.3; depth=0x40; createMandelbrot(range, dx, dy)">
            リセット
          </v-btn>
          <v-btn @click="dx+=range/4; dy+=range/4; range/=2; createMandelbrot(range, dx, dy)">
            ×2
          </v-btn>
          <v-btn @click="dx+=range/8*3; dy+=range/8*3; range/=4; createMandelbrot(range, dx, dy)">
            ×4
          </v-btn>
          <v-btn @click="dx-=range/2; dy-=range/2; range*=2; createMandelbrot(range, dx, dy)">
            ÷2
          </v-btn>
          <v-btn @click="dx-=range/2*3; dy-=range/2*3; range*=4; createMandelbrot(range, dx, dy)">
            ÷4
          </v-btn>
          <v-btn @click="dx -= range/20; createMandelbrot(range, dx, dy)">
            ←
          </v-btn>
          <v-btn @click="dy += range/20; createMandelbrot(range, dx, dy)">
            ↓
          </v-btn>
          <v-btn @click="dy -= range/20; createMandelbrot(range, dx, dy)">
            ↑
          </v-btn>
          <v-btn @click="dx += range/20; createMandelbrot(range, dx, dy)">
            →
          </v-btn>
          <v-btn @click="depth += 0x40; createMandelbrot(range, dx, dy)">
            計算量を増やす
          </v-btn>
          <v-btn @click="depth = 0x80; createMandelbrot(range, dx, dy)">
            計算量を戻す
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Simulator',
  data () {
    return {
      range: 2.6,
      dx: -2.1,
      dy: -1.3,
      depth: 0x80
    }
  },
  mounted () {
    this.createMandelbrot(2.6, -2.1, -1.3)
  },
  methods: {
    createMandelbrot (range, dx, dy) {
      const cv = document.getElementById('mandelbrot_edit')
      if (cv.getContext && cv.getContext('2d').createImageData) {
        const size = 512
        const context = cv.getContext('2d')
        const imgData = context.createImageData(size, size)
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            let t = this.calcMandelbrot(j / size * range + dx, i / size * range + dy, this.depth)
            if (t === this.depth) {
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

</style>
