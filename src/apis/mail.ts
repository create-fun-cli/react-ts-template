import { request } from '@/utils/request'
import ListResponse = List.ListResponse

export type MailListItem = {
  id: string
  title: string
  created_at: string
}

export function getList() {
  return request.get<unknown, ListResponse<MailListItem>>('/mail/list')
}
