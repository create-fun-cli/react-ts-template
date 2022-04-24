import { request } from '@/utils'

export interface AuthInfo {
  username: string
  group: string
}

export function login(ticket: string) {
  return request.get<AuthInfo>('/auth/login', { params: { ticket } })
}
