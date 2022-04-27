import request from '@/utils/request'

export const getArticleListAPI = function(_page, _limit) {
  return request.get('/articles', {
    params: {
      _page,
      _limit
    }
  })
}
