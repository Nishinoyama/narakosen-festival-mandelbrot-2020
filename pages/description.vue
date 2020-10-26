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
            では、ある条件とは何でしょう。それは、ペアとなる数$(x_0,y_0)$において、$x=y=0$である$x,y$が
            下の変換を何度繰り返しても絶対値($\sqrt{x^2+y^2}$)が2を超えないことです。
          </p>
          <p>
            \begin{align}
            x &amp; \rightarrow x^2 - y^2 + x_0\\
            y &amp; \rightarrow 2xy + y_0
            \end{align}
          </p>
          <p>
            具体的な例として、$x_0 = 0, y_0 = 1$を考えます。
            変換を繰り返すと、$(x,y)$はこのように変遷していきます。
          </p>
          <p>
            \begin{align}
            &amp; (0,0) \\
            \rightarrow &amp; (0,1) \\
            \rightarrow &amp; (-1,1) \\
            \rightarrow &amp; (0,-1) \\
            \rightarrow &amp; (-1,1) \\
            \rightarrow &amp; (0,-1) \cdots
            \end{align}
          </p>
          <p>
            と、何度も$(-1,1)$と$(0,1)$を行き来するようになり、一向に絶対値が$2$を超える様子はありません。
            この場合、$(0,1)$は<strong class="red--text">マンデルブロ集合に属する</strong>形になります。
          </p>
          <p>
            同様に、$x_0 = 1, y_0 = 0$を考えます。
            変換を繰り返すと、$(x,y)$はこのように変遷していきます。
          </p>
          <p>
            \begin{align}
            &amp; (1,0) \\
            \rightarrow &amp; (2,0) \\
            \rightarrow &amp; (5,0) \\
            \rightarrow &amp; (26,0) \cdots
            \end{align}
          </p>
          <p>
            と、$x$の値がどんどん増幅してしまい、2度目の変換で絶対値が$5$になり絶対値が$2$を超えてしまいました。
            この場合、$(1,0)$は<strong class="red--text">マンデルブロ集合に属さない</strong>形になります。
          </p>
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
  mounted () {
    this.LaTexRenderer()
  }
}
</script>

<style scoped>
.index{
  font-size: 1rem;
}
</style>
