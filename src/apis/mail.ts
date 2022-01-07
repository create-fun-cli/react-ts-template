import { request } from '@/utils/request'
import { ListResponse } from 'List'

export type MailListItem = {
  id: string
  title: string
  created_at: string
}

export function getList() {
  return request.get<ListResponse<MailListItem>>('/mail/list')
}
