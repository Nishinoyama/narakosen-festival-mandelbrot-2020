<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-toolbar-title class="d-none d-md-block" v-text="subTitle" />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-abjad-hebrew',
          title: '始めに',
          to: '/'
        },
        {
          icon: 'mdi-comment-question-outline',
          title: '説明',
          to: '/description'
        },
        {
          icon: 'mdi-comment-alert-outline',
          title: '詳細説明',
          to: '/deep'
        },
        {
          icon: 'mdi-bank-outline',
          title: 'ギャラリー',
          to: '/gallery'
        },
        {
          icon: 'mdi-pencil-box-multiple-outline',
          title: 'エディット',
          to: '/simulator'
        }
      ],
      miniVariant: false,
      title: '数学同好会',
      subTitle: 'マンデルブロ集合の紹介'
    }
  }
}
</script>

<style>
</style>
