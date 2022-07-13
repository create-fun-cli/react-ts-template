import { ConfigProvider } from 'antd'
import locale from 'antd/lib/locale/zh_CN'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
import { HashRouter as Router } from 'react-router-dom'
import App from './App'
import './styles/index.scss'
import { createRoot } from 'react-dom/client'

moment.locale('zh-cn')

if (import.meta.env.VITE_ENABLE_MOCK === 1) {
  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

const root = createRoot(document.getElementById('root') as Element)

root.render(
  <Router>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  </Router>,
)
