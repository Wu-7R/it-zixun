<template>
  <div class="home-container">
    <van-nav-bar
      title="黑马头条" :fixed='true'
    />
    <van-pull-refresh v-model="refreshing" :disabled='finished' @refresh="onRefresh" >
      <van-list v-model="loading" :finished="finished" finished-text="我是有底线的..." @load="onLoad">
        <ArticleInfo v-for="item in artlist"
        :key="item.id"
        :title="item.title"
        :author="item.aut_name"
        :cmt-count="item.comm_count"
        :time="item.pubdate"
        :cover="item.cover"
        ></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>

</template>

<script>
import { getArticleListAPI } from '@/api/articleAPI.js'
import ArticleInfo from '@/components/Article/Articleinfo.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  data() {
    return {
      page: 1,
      limit: 10,
      artlist: [],
      loading: true,
      finished: false,
      refreshing: false
    }
  },
  created() {
    this.initArticleList()
  },
  methods: {
    async initArticleList(isRefresh) {
      const { data: res } = await getArticleListAPI(this.page, this.limit)

      if (isRefresh) {
        this.artlist = [...res, ...this.artlist]
        this.refreshing = false
      } else {
        this.artlist = [...this.artlist, ...res]
        this.loading = false
      }

      if (res.length === 0) {
        this.finished = true
      }
    },
    onLoad() {
      console.log('触发 load 事件')
      this.page++
      this.initArticleList()
    },
    onRefresh() {
      console.log('触发下拉刷新')
      this.page++
      this.initArticleList(true)
    }
  },
  components: {
    ArticleInfo
  }
}
</script>

<style lang='less' scoped>
.home-container {
  padding: 46px 0 50px 0;
  }
  .van-nav-bar {
    background-color: red;
  }
  /deep/ .van-nav-bar__title {
    color:#fff;
  }
</style>
