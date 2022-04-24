import { Form, Select } from 'antd'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createContext, ReactNode, useContext, useState } from 'react'
// eslint-disable-next-line @typescript-eslint/no-shadow
const { Option } = Select

const GameContext = createContext({
  value: '',
  setValue: (id: string) => {},
})

export function useGame() {
  return useContext(GameContext)
}

const games = [
  { name: 'game1', id: 1 },
  { name: 'game2', id: 2 },
  { name: 'game3', id: 3 },
]

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const defaultGame = localStorage.getItem('game') || ''
  const [game, setGame] = useState(defaultGame)

  return (
    <GameContext.Provider
      value={{
        value: game,
        setValue(id: string) {
          setGame(id)
        },
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const GameSelect = () => {
  const gameCtx = useGame()

  return (
    <Form layout="inline">
      <Form.Item label="选择游戏">
        <Select
          style={{ width: '100px' }}
          defaultValue={gameCtx.value}
          value={gameCtx.value}
          onChange={value => {
            gameCtx.setValue(value)
            localStorage.setItem('game', value)
          }}
        >
          {games.map(game => (
            <Option value={game.id} key={game.id} title={game.name}>
              {game.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
