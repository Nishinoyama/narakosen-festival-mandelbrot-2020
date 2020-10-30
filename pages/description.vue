<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="10">
      <v-card class="index">
        <v-card-title class="headline">
          マンデルブロ集合とは(簡易バージョン)
        </v-card-title>
        <v-card-text>
          <p>
            <strong>
              ※説明の難易度を下げるため、本来の定義とは異なる部分があります。より詳しい説明は次のページで行います。
            </strong>
          </p>
          <p>
            まず、<strong class="blue--text">マンデルブロ集合</strong>とはどのようなものなのでしょうか？
            <strong class="blue--text">集合</strong>というからには、ある条件を満たす何かの集まりです。
          </p>
          <p>
            では、ある条件とは何でしょう。それは、ペアとなる数$(C_x,C_y)$において、$x=y=0$である$x,y$が下の変換を何度繰り返しても絶対値($\sqrt{x^2+y^2}$)が2を超えないことです。
          </p>
          <p>
            \begin{align}
            x &amp; \rightarrow x^2 - y^2 + C_x\\
            y &amp; \rightarrow 2xy + C_y
            \end{align}
          </p>
          <p>
            具体的な例として、$C_x = 0, C_y = 1$を考えます。
            変換を繰り返すと、$(x,y)$は次のように変遷していきます。
          </p>
          <p>
            \begin{align}
            (x,y) = & (0,0) \\
            \rightarrow &amp; (0,1) \\
            \rightarrow &amp; (-1,1) \\
            \rightarrow &amp; (0,-1) \\
            \rightarrow &amp; (-1,1) \\
            \rightarrow &amp; (0,-1) \cdots
            \end{align}
          </p>
          <p>
            と、何度も$(-1,1)$と$(0,-1)$を行き来するようになり、一向に絶対値が$2$を超える様子はありません。
            この場合、$(0,1)$は条件を満たすため、<strong class="red--text">マンデルブロ集合に属する</strong>形になります。
          </p>
          <p>
            同様に、$C_x = 1, C_y = 0$を考えます。
            変換を繰り返すと、$(x,y)$は次のように変遷していきます。
          </p>
          <p>
            \begin{align}
            (x,y) = & (0,0) \\
            \rightarrow &amp; (1,0) \\
            \rightarrow &amp; (2,0) \\
            \rightarrow &amp; (5,0) \\
            \rightarrow &amp; (26,0) \cdots
            \end{align}
          </p>
          <p>
            と、$x$の値がどんどん増幅してしまい、2度目の変換で絶対値が$5$になり絶対値が$2$を超えてしまいました。
            この場合、$(1,0)$は条件を満たさないため、<strong class="red--text">マンデルブロ集合に属さない</strong>形になります。
          </p>
          <p>
            このように、$(C_x,C_y)$によって集合条件を満たしたり満たしなかったりします。そして、満たす$(C_x,C_y)$全ての集まりを
            <strong class="red--text">マンデルブロ集合</strong>と言います。
          </p>
          <p>
            マンデルブロ集合の$(C_x,C_y)$を$xy$座標に見立て、図にまとめると、以下の様になります。
          </p>
          <p clasS="text-center">
            <img src="@/assets/monochromatic_mandelbrot.png" alt="白黒マンデルブロ">
          </p>
          <p>
            なんだか見覚えのあるシルエットが現れ、マンデルブロ集合の正体を暴けました！
          </p>
          <hr class="my-3">
        </v-card-text>
        <v-card-title class="headline">
          マンデルブロ集合のカラフルな図の作り方
        </v-card-title>
        <v-card-text>
          <p>
            しかしながら、先ほどのシルエットは、最初のページで出たカラフルな図とは違っています。このカラフルな図は何に基づいて色を塗り分けているのでしょうか？
          </p>
          <!--          <p class="text-center">-->
          <!--            <img src="@/assets/polychromatic_mandelbrot.png" alt="カラフルマンデルブロ">-->
          <!--          </p>-->
          <p>
            答えは単純で、<strong class="red--text">$x,y$の変換にて絶対値が2を越えるまでに要した変換数</strong> です。
            変換数に応じたグラデーションの色をあてたのが下の画像になります。
            実際にリアルタイムでマンデルブロ集合を作成される様子を見てみましょう。
          </p>
          <div class="text-center">
            <canvas
              id="mandelbrot_sample"
              width="512"
              height="512"
              :class="animationButton?'non_animation':'animation'"
              @click="() => { if(animationButton) animationMandelbrot(0) }"
            />
          </div>
          <div class="text-center">
            <v-btn
              color="primary"
              :disabled="!animationButton"
              @click="animationMandelbrot(0)"
            >
              <v-icon>mdi-play-circle-outline</v-icon><span class="d-none d-sm-block">（描画アニメーション）</span>
            </v-btn>
          </div>
        </v-card-text>
        <v-card-text>
          <hr class="my-3">
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="secondary"
            nuxt
            to="/"
          >
            戻る<span class="d-none d-sm-block">（始めに）</span>
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/"
          >
            次へ<span class="d-none d-sm-block">（もっと詳しい説明）</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      animationButton: true
    }
  },
  mounted () {
    this.LaTexRenderer()
    this.createMandelbrot(2.6, -2.1, -1.3, 0x40)
  },
  methods: {
    animationMandelbrot (depth) {
      this.animationButton = false
      setTimeout(() => {
        this.createMandelbrot(2.6, -2.1, -1.3, depth)
        if (depth < 0x40) {
          this.animationMandelbrot(depth + 1)
        } else {
          this.animationButton = true
        }
      }, 100)
    },
    createMandelbrot (range, dx, dy, depth) {
      const cv = document.getElementById('mandelbrot_sample')
      if (cv.getContext && cv.getContext('2d').createImageData) {
        const size = 512
        const context = cv.getContext('2d')
        const imgData = context.createImageData(size, size)
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            let t = this.calcMandelbrot(j / size * range + dx, i / size * range + dy, depth)
            if (t === depth) {
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

<style>
.index{
  font-size: 1rem;
}

canvas.non_animation{
  cursor: pointer;
}
canvas.non_animation:hover{
  opacity: 0.9;
}
</style>
