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
          <v-btn color="error" @click="range=2.6; dx=-2.1; dy=-1.3; depth=0x80; createMandelbrot(range, dx, dy)">
            リセット
          </v-btn>
          <v-btn @click="mulScale(2)">
            ×2
          </v-btn>
          <v-btn @click="mulScale(4)">
            ×4
          </v-btn>
          <v-btn @click="mulScale(8)">
            ×8
          </v-btn>
          <v-btn @click="mulScale(0.5)">
            ÷2
          </v-btn>
          <v-btn @click="mulScale(0.25)">
            ÷4
          </v-btn>
          <v-btn @click="mulScale(0.125)">
            ÷8
          </v-btn>
          <v-btn @click="moveLeft">
            ←
          </v-btn>
          <v-btn @click="moveDown">
            ↓
          </v-btn>
          <v-btn @click="moveUp">
            ↑
          </v-btn>
          <v-btn @click="moveRight">
            →
          </v-btn>
          <v-btn @click="incDepth(0x20)">
            計算量を増やす
          </v-btn>
          <v-btn @click="setDepth(0x80)">
            計算量を戻す
          </v-btn>
          <v-checkbox v-model="reticle" :label="'レチクル'" @click="createMandelbrot" />
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
      depth: 0x80,
      reticle: true
    }
  },
  mounted () {
    this.createMandelbrot()
  },
  methods: {
    moveLeft () {
      this.dx -= this.range / 20
      this.createMandelbrot()
    },
    moveDown () {
      this.dy += this.range / 20
      this.createMandelbrot()
    },
    moveUp () {
      this.dy -= this.range / 20
      this.createMandelbrot()
    },
    moveRight () {
      this.dx += this.range / 20
      this.createMandelbrot()
    },
    incDepth (time) {
      this.depth += time
      this.createMandelbrot()
    },
    setDepth (time) {
      this.depth = time
      this.createMandelbrot()
    },
    mulScale (mul) {
      const displacement = (0.5 - (0.5 / mul)) * this.range
      this.dx += displacement
      this.dy += displacement
      this.range /= mul
      this.createMandelbrot()
    },
    createMandelbrot () {
      const cv = document.getElementById('mandelbrot_edit')
      if (cv.getContext && cv.getContext('2d').createImageData) {
        const size = 512
        const context = cv.getContext('2d')
        const imgData = context.createImageData(size, size)
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            let t = this.calcMandelbrot(j / size * this.range + this.dx, i / size * this.range + this.dy, this.depth)
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
        if (this.reticle) {
          // レチクルの点
          imgData.data[size / 2 * size * 4 + size / 2 * 4] = 0xFF
          imgData.data[size / 2 * size * 4 + size / 2 * 4 + 1] = 0
          imgData.data[size / 2 * size * 4 + size / 2 * 4 + 2] = 0
          imgData.data[(size / 2 + 1) * size * 4 + size / 2 * 4] = 0xFF
          imgData.data[(size / 2 + 1) * size * 4 + size / 2 * 4 + 1] = 0
          imgData.data[(size / 2 + 1) * size * 4 + size / 2 * 4 + 2] = 0
          imgData.data[(size / 2 - 1) * size * 4 + size / 2 * 4] = 0xFF
          imgData.data[(size / 2 - 1) * size * 4 + size / 2 * 4 + 1] = 0
          imgData.data[(size / 2 - 1) * size * 4 + size / 2 * 4 + 2] = 0
          imgData.data[size / 2 * size * 4 + (size / 2 + 1) * 4] = 0xFF
          imgData.data[size / 2 * size * 4 + (size / 2 + 1) * 4 + 1] = 0
          imgData.data[size / 2 * size * 4 + (size / 2 + 1) * 4 + 2] = 0
          imgData.data[size / 2 * size * 4 + (size / 2 - 1) * 4] = 0xFF
          imgData.data[size / 2 * size * 4 + (size / 2 - 1) * 4 + 1] = 0
          imgData.data[size / 2 * size * 4 + (size / 2 - 1) * 4 + 2] = 0
        }
        context.putImageData(imgData, 0, 0)
      }
    }
  }
}
</script>

<style scoped>

</style>
