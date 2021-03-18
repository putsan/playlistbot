import express from 'express';
import { Telegraf } from 'telegraf';

import { PORT, TOKEN } from './config.js';
import { getMainMenu, yesNoKeyboard } from './keyboards.js';

const app = express()
const bot = new Telegraf(TOKEN)

bot.start(ctx => {
  ctx.replyWithHTML(
      'Приветсвую в <b>TaskManagerBot</b>\n\n'+
      'Чтобы быстро добавить задачу, просто напишите ее и отправьте боту',
      getMainMenu())
})

bot.on('voice', ctx => {
  ctx.reply('Какой чудный голос')
})

bot.on('sticker', ctx => {
  ctx.reply('Прикольный стикер')
})

bot.on('edited_message', ctx => {
  ctx.reply('Вы успешно изменили сообщение');
});

bot.hears('Мои задачи', ctx => {
  ctx.reply('Тут будут ваши задачи')
})

bot.hears('Добавить задачу', ctx => {
  ctx.reply('Тут вы сможете добавить свои задачи')
})

bot.hears('Смотивируй меня', ctx => {
  ctx.replyWithPhoto(
      'https://img2.goodfon.ru/wallpaper/nbig/7/ec/justdoit-dzhastduit-motivaciya.jpg',
      {
          caption: 'Не вздумай сдаваться!'
      }
  )
})

bot.on('text', ctx => {
  ctx.replyWithHTML(
      `Вы действительно хотите добавить задачу:\n\n`+
      `<i>${ctx.message.text}</i>`,
      yesNoKeyboard()
  )
})


bot.launch();
app.listen(PORT, () => console.log(`My server is running on port ${PORT}`));
