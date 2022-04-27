import request from '@/utils/request'

export const getUesrInfoAPI = function() {
  return request.get('/user')
}
