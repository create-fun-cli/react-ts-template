import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { render } from 'react-dom'
import App from './App'
import './index.css'

function renderApp() {
  render(
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>,
    document.getElementById('root'),
  )
}

async function main() {
  if (import.meta.env.VITE_ENABLE_MOCK === 'true') {
    const { worker } = await import('./mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }

  renderApp()
}

main().then()
