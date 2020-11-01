<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="10">
      <v-card class="index">
        <v-card-title class="headline">
          マンデルブロ集合とは(詳細バージョン)
        </v-card-title>
        <v-card-text>
          <p>
            <strong>
              ※読み飛ばしてもらっても構いません。詳しく知りたい人向け。複素数(高専1年範囲)、数列の極限(高専2年範囲)を知っていることを前提とします。
            </strong>
          </p>
          <p>
            マンデルブロ集合である条件は、本当は<strong class="blue--text">複素数</strong>が関わってきます。
            その本当の条件とは、ある複素数$C$において、以下の漸化式による無限数列$\{z_n\}$が発散しないことです。
          </p>
          <p>
            \begin{align}
            z_0 &= 0\\
            z_{n+1} &= z_n^2 + C \quad ( n = 0, 1, 2 \cdots )\\
            \end{align}
          </p>
          <p>
            $C = C_x + C_yi, \quad z = x + yi$とみなせば、前のページの2式が見受けられると思います。
          </p>
          <p>
            しかし、<strong class="blue--text">絶対値が$2$を超えない</strong>という条件が、<strong class="red--text">発散しない</strong>という条件に変わっています。
            どういうことでしょうか。実はこの2条件は<strong>同値</strong>であります。証明してみましょう。
          </p>
          <p class="proof">
            証明始）<br>
            同値であることより裏が成り立つため、「絶対値が$2$を超えること」$\Leftrightarrow$「発散すること」を示す。<br>
            $\Leftarrow$は自明であるため、$\Rightarrow$を示す。<br>
            任意の複素数$x,y$において、三角不等式$|x+y| \geq |x| - |y|$より、
            $|z_{n+1}| = |z_{n}^2 + C| \geq |z_n^2| - |C|$となる。 <br>
            数列$\{z_n\}$において、$k$項目で初めて2を超えた$\left(|z_k| > 2\right)$とする。 <br>
            $|C| > 2$の場合、$k=1$となり（1項目で$|z_1| = |C| > 2$となるため）<br>
            $|z_{k+1}| \geq |z_k^2| - |C| = |z_k| - |z_k| = |z_k| ( |z_k| - 1 ) \Rightarrow |z_{n+1}| \geq |z_n|r \quad (r = |z_n - 1| > 1, n \geq k)$  <br>
            よって、数列$\{z_n\}$において$n \rightarrow \infty$のとき、$|z_n| \geq |z_k| r^n \rightarrow \infty$より$|z_n| \rightarrow \infty$<br>
            また、$|C| \leq 2$の場合、自明に$|z_k| >|C|$であり、<br>
            $|z_{k+1}| \geq |z_k^2| - |C| > 2|z_k| - |C| = |z_k| + (|z_k| - |C|) \Rightarrow |z_{n+1}| > |z_n| + d \quad (d = |z_n| - |C| > 0, n \geq k)$<br>
            よって、数列$\{z_n\}$において$n \rightarrow \infty$のとき、$|z_n| > |z_k| + nd \rightarrow \infty$より$|z_n| \rightarrow \infty$<br>
            したがって、数列$\{z_n\}$において絶対値が$2$を超えないと発散しないことが示された。<br>
            証明終）
          </p>
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
            to="/deep"
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
  name: 'Deep',
  mounted () {
    this.LaTexRenderer()
  }
}
</script>

<style scoped>

</style>
