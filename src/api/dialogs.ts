import { User_1, User_2 } from '@/api/chats'

export interface IChat {
  text: Array<string>
  time: string
  isAuthor: boolean
}

export interface IDialog {
  id: number
  img: string
  username: string
  chat: IChat[]
}

export const DIALOGS: IDialog[] = [
  {
    id: 1,
    img: 'user-1.png',
    username: 'Beka',
    chat: JSON.parse(JSON.stringify(User_1))
  },
  {
    id: 2,
    img: 'user-2.png',
    username: 'Beksultan',
    chat: JSON.parse(JSON.stringify(User_2))
  },
  {
    id: 3,
    img: 'user-3.png',
    username: 'Alan',
    chat: JSON.parse(JSON.stringify(User_1))
  },
  {
    id: 4,
    img: 'user-4.png',
    username: 'Erlan',
    chat: JSON.parse(JSON.stringify(User_1))
  },
  {
    id: 5,
    img: 'user-5.png',
    username: 'Sati',
    chat: JSON.parse(JSON.stringify(User_1))
  },
  {
    id: 6,
    img: 'user-6.png',
    username: 'Erkebulan',
    chat: []
  },
  {
    id: 7,
    img: 'user-7.png',
    username: 'Adilbek',
    chat: []
  }
]
