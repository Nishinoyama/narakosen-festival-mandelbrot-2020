import Vue from 'vue'

Vue.mixin({
  methods: {
    calcX (xx, yy, x) {
      return xx * xx - yy * yy + x
    },
    calcY (xx, yy, y) {
      return 2 * xx * yy + y
    },
    abs2 (x, y) {
      return Math.sqrt(x * x + y * y)
    },
    calcMandelbrot (x, y, depth) {
      let xx = 0
      let yy = 0
      let tx = 0
      let ty = 0
      let i
      for (i = 0; i < depth; i++) {
        tx = this.calcX(xx, yy, x)
        ty = this.calcY(xx, yy, y)
        if (this.abs2(tx, ty) > 4) {
          break
        }
        xx = tx
        yy = ty
      }
      return i
    }
  },
  createMandelbrot (range, dx, dy) {
    const cv = document.getElementById('mandelbrot_sample')
    if (cv.getContext && cv.getContext('2d').createImageData) {
      const size = 512
      const context = cv.getContext('2d')
      const imgData = context.createImageData(size, size)
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          let t = this.calcMandelbrot(j / size * range + dx, i / size * range + dy)
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
})
