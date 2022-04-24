import { request } from '@/utils'
import { MailType } from 'views/Mail/Mail'

export interface KingdomMailListItem {
  kingdom_id: string
  info: MailListItemInfo
}

export interface AllianceMailListItem {
  alliance_id: string
  info: MailListItemInfo
}

export interface PlayerMailListItem {
  uid: string
  info: MailListItemInfo
}

export type MailListItem = KingdomMailListItem | AllianceMailListItem | PlayerMailListItem

export interface MailListItemInfo {
  mail_id: number
  category: number
  mail_conf_id: number
  sender: string
  subject: string
  body: string
  status: 0 | 1 // 0 未读 1 已读
  attachment: string
  attachment_status: 0 | 1 // 0 不含附件 1 含有附件
  attachment_expiration_timestamp: number
  expiration_timestamp: number
  extension: string
  ctime: number
  mtime: number
}

export function getKingdomMailList(game: string, params: { kingdom_id: number; mailId?: number }) {
  return request.get<KingdomMailListItem[]>(`/kingdomMail/${game}/list`, { params })
}

export function getAllianceMailList(game: string, params: { alliance_id: number; mailId?: number }) {
  return request.get<AllianceMailListItem[]>(`/allianceMail/${game}/list`, { params })
}

export function getPlayerMailList(game: string, params: { uid: number; mailId?: number; category?: string }) {
  return request.get<PlayerMailListItem[]>(`/usermail/${game}/list`, { params })
}

function deleteKingdomMail(game: string, data: { kingdom_id: string | number; mail_ids: Array<number | string> }) {
  return request.post(`/kingdomMail/${game}/del`, data)
}

function deleteAllianceMail(game: string, data: { alliance_id: string | number; mail_ids: Array<number | string> }) {
  return request.post(`/allianceMail/${game}/del`, data)
}

function deletePlayerMail(game: string, data: { uid: string | number; mail_ids: Array<number | string> }) {
  return request.post(`/usermail/${game}/del`, data)
}

export function deleteMail(
  type: MailType,
  game: string,
  data: { id: string | number; mail_ids: Array<number | string> },
) {
  switch (type) {
    case MailType.Kingdom:
      return deleteKingdomMail(game, { kingdom_id: data.id, mail_ids: data.mail_ids })
    case MailType.Alliance:
      return deleteAllianceMail(game, { alliance_id: data.id, mail_ids: data.mail_ids })
    case MailType.Player:
      return deletePlayerMail(game, { uid: data.id, mail_ids: data.mail_ids })
  }
}

function getKingdomMailDetail(game: string, params: { kingdom_id: string | number; mail_id: number | string }) {
  return request.get<KingdomMailListItem>(`/kingdomMail/${game}/detail`, { params })
}

function getAllianceMailDetail(game: string, params: { alliance_id: string | number; mail_id: number | string }) {
  return request.get<AllianceMailListItem>(`/allianceMail/${game}/detail`, { params })
}

function getPlayerMailDetail(game: string, params: { uid: string | number; mail_id: number | string }) {
  return request.get<PlayerMailListItem>(`/usermail/${game}/detail`, { params })
}

export function getMailDetail(type: MailType, game: string, data: { id: string | number; mail_id: number | string }) {
  switch (type) {
    case MailType.Kingdom:
      return getKingdomMailDetail(game, { kingdom_id: data.id, mail_id: data.mail_id })
    case MailType.Alliance:
      return getAllianceMailDetail(game, { alliance_id: data.id, mail_id: data.mail_id })
    case MailType.Player:
      return getPlayerMailDetail(game, { uid: data.id, mail_id: data.mail_id })
  }
}
