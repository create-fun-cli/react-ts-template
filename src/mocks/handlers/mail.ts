import { mock } from 'mockjs'
import { rest } from 'msw'

const requests = [
  rest.get('/api/kingdomMail/:game/list', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        mock({
          msg: '',
          'data|20-20': [
            {
              kingdom_id: '@id',
              info: {
                mail_id: '@id',
                category: '@natural',
                mail_conf_id: '@natural',
                sender: '@name',
                subject: '@name',
                body: '@paragraph',
                status: '@natural(0,1)',
                attachment: '@name',
                attachment_status: '@natural(0,1)',
                attachment_expiration_timestamp: '@datetime',
                expiration_timestamp: '@datetime',
                ctime: '@datetime',
                mtime: '@datetime',
              },
            },
          ],
        }),
      ),
    )
  }),
  rest.post('/api/kingdomMail/:game/del', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        mock({
          code: 0,
          msg: 'ok',
        }),
      ),
    )
  }),
  rest.get('/api/kingdomMail/:game/detail', (_, res, ctx) =>
    res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json(
        mock({
          msg: '',
          data: mock({
            kingdom_id: '@id',
            info: {
              mail_id: '@id',
              category: '@natural',
              mail_conf_id: '@natural',
              sender: '@name',
              subject: '@name',
              body: '@paragraph',
              status: '@natural(0,1)',
              attachment: '@name',
              attachment_status: '@natural(0,1)',
              attachment_expiration_timestamp: '@datetime',
              expiration_timestamp: '@datetime',
              ctime: '@datetime',
              mtime: '@datetime',
            },
          }),
        }),
      ),
    ),
  ),
  rest.get('/api/allianceMail/:game/list', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        mock({
          msg: '',
          'data|0-20': [
            {
              alliance_id: '@id',
              info: {
                mail_id: '@id',
                category: '@natural',
                mail_conf_id: '@natural',
                sender: '@name',
                subject: '@name',
                body: '@paragraph',
                status: '@natural(0,1)',
                attachment: '@name',
                attachment_status: '@natural(0,1)',
                attachment_expiration_timestamp: '@datetime',
                expiration_timestamp: '@datetime',
                ctime: '@datetime',
                mtime: '@datetime',
              },
            },
          ],
        }),
      ),
    )
  }),
  rest.post('/api/allianceMail/:game/del', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        mock({
          code: 0,
          msg: 'ok',
        }),
      ),
    )
  }),
  rest.get('/api/allianceMail/:game/detail', (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json(
        mock({
          msg: '',
          data: mock({
            alliance_id: '@id',
            info: {
              mail_id: '@id',
              category: '@natural',
              mail_conf_id: '@natural',
              sender: '@name',
              subject: '@name',
              body: '@paragraph',
              status: '@natural(0,1)',
              attachment: '@name',
              attachment_status: '@natural(0,1)',
              attachment_expiration_timestamp: '@datetime',
              expiration_timestamp: '@datetime',
              ctime: '@datetime',
              mtime: '@datetime',
            },
          }),
        }),
      ),
    ),
  ),
  rest.get('/api/usermail/:game/list', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        mock({
          msg: '',
          'data|0-20': [
            {
              uid: '@id',
              info: {
                mail_id: '@id',
                category: '@natural',
                mail_conf_id: '@natural',
                sender: '@name',
                subject: '@name',
                body: '@paragraph',
                status: '@natural(0,1)',
                attachment: '@name',
                attachment_status: '@natural(0,1)',
                attachment_expiration_timestamp: '@datetime',
                expiration_timestamp: '@datetime',
                ctime: '@datetime',
                mtime: '@datetime',
              },
            },
          ],
        }),
      ),
    )
  }),
  rest.post('/api/usermail/:game/del', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        mock({
          code: 0,
          msg: 'ok',
        }),
      ),
    )
  }),
  rest.get('/api/usermail/:game/detail', (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json(
        mock({
          msg: '',
          data: mock({
            uid: '@id',
            info: {
              mail_id: '@id',
              category: '@natural',
              mail_conf_id: '@natural',
              sender: '@name',
              subject: '@name',
              body: '@paragraph',
              status: '@natural(0,1)',
              attachment: '@name',
              attachment_status: '@natural(0,1)',
              attachment_expiration_timestamp: '@datetime',
              expiration_timestamp: '@datetime',
              ctime: '@datetime',
              mtime: '@datetime',
            },
          }),
        }),
      ),
    ),
  ),
]

export default requests
