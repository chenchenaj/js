// https://www.bilibili.com/video/BV14z411i7JY?p=8
import Mock from 'mockjs'
import { getUserInfo, getTableData } from './requset'

Mock.mock(/\/getUserInfo/, 'post', getUserInfo)
Mock.mock(/\/getTableData/, 'get', getTableData)

Mock.mock('/orderfood', {code: 0, data: apiData.orderfood})

export default Mock
