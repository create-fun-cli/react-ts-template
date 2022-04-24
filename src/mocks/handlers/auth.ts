import { mock } from 'mockjs'
import { rest } from 'msw'

const requests = [
  rest.get('/api/auth/login', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        mock({
          msg: 'ok',
          data: {
            username: 'hao.li',
            group: '中台一部Web组',
          },
        }),
      ),
    )
  }),
]

export default requests
