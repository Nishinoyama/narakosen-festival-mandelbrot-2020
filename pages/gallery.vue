<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title>
          マンデルブロ集合ギャラリー
        </v-card-title>
        <v-card-text>
          <p>
            本ページ製作中に見つかったマンデルブロ集合のキレイな模様たちを選出しました。
          </p>
        </v-card-text>
        <v-card elevation="0" class="d-flex flex-wrap">
          <v-card
            v-for="name in pictureNames"
            :key="name"
            elevation="0"
          >
            <v-card-text>
              <v-img sm="256" md="512" :src="getImgUrl(name)" />
            </v-card-text>
          </v-card>
        </v-card>
        <v-card-text>
          <hr class="my-3">
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="secondary"
            nuxt
            to="/deep"
          >
            戻る<span class="d-none d-sm-block">（もっと詳しい説明）</span>
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/simulator"
          >
            次へ<span class="d-none d-sm-block">（マンデルブロ集合シミュレーター）</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Gallery',
  data () {
    return {
      pictureNames: [
        'man_8192_-0.5586938476562501_-0.6375903320312495_416',
        'man_4194394_-1.9089321684837308_-3.099441527580164e-7_384',
        'man_2097152_-0.5621988201141369_-0.6428187179565431_192',
        'man_8192_-1.4846502685546863_-0.00015869140624992598_640',
        'man_4398046511104_-0.6247745938639611_-0.46407702373249105_416'
      ]
    }
  },
  methods: {
    getImgUrl (name) {
      const images = require.context('@/assets/', false, /\.png$/)
      return images('./' + name + '.png')
    }
  }
}
</script>

<style scoped>

</style>
