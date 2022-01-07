import { mock } from 'mockjs'
import { rest } from 'msw'

const requests = [
  rest.get('/api/mail/list', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        mock({
          msg: '',
          data: {
            'list|1-01': [
              {
                id: '@id',
                title: '@title',
                created_at: '@datetime',
              },
            ],
            page: 1,
            page_size: 10,
            total: 10,
          },
        }),
      ),
    )
  }),
]

export default requests
