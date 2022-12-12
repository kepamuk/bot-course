const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '5644404883:AAHM2UkxpvHl25fSDFTIo9gYZiOYhKSg9s4'

const bot = new TelegramApi(token, {polling: true})

const chats = {}


const startGame = async (chatId) => {
  await bot.sendMessage(chatId, 'Integer 0 to 9, try choose')
  const randomNumber = Math.floor(Math.random() * 10)
  chats[chatId] = randomNumber
  await bot.sendMessage(chatId, 'Try', gameOptions)
}

const start = () => {
  bot.setMyCommands([
    {command: '/start', description: 'Start hello'},
    {command: '/info', description: 'Get user info'},
    {command: '/game', description: 'Try number'},
  ])

  bot.on('message', async msg => {

    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
      await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/422/93d/42293d5f-7cd5-49f6-a8fd-939f71b06a83/3.jpg')
      return bot.sendMessage(chatId, `Welcome stas`)
    }

    if (text === '/info') {
      return bot.sendMessage(chatId, `Your name is ${msg.from.first_name} ${msg.from.last_name}`)
    }

    if (text === '/game') {
      return startGame(chatId)
    }
    return bot.sendMessage(chatId, 'I dont understand you, lets try again')

  })

  bot.on('callback_query', msg => {
    const data = msg.data
    const chatId = msg.message.chat.id

    if (data === '/again') {
      return startGame(chatId)
    }

    if (parseInt(data) === chats[chatId]) {
      return bot.sendMessage(chatId, `You won ${chats[chatId]}`, againOptions)
    } else {
      return bot.sendMessage(chatId, `You lose ${chats[chatId]}`, againOptions)
    }
  })
}

start()