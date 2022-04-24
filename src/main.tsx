import { ConfigProvider } from 'antd'
import locale from 'antd/lib/locale/zh_CN'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
import { render } from 'react-dom'
import App from './App'
import './styles/index.scss'

moment.locale('zh-cn')

async function main() {
  if (import.meta.env.VITE_ENABLE_MOCK === 'true') {
    const { worker } = await import('./mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }

  render(
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>,
    document.getElementById('root'),
  )
}

main()
