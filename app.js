import express from 'express';
import { Telegraf, session } from 'telegraf';

import { PORT, TOKEN } from './config.js';
import { getMainMenu, yesNoKeyboard } from './keyboards.js';
import { addTask, getMyTasks, deleteTask } from './db.js'

const app = express()
const bot = new Telegraf(TOKEN)

bot.use(session());

bot.start(ctx => {
  ctx.replyWithHTML(
    'Приветсвую в <b>TaskManagerBot</b>\n\n' +
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

bot.hears('Мои задачи', async ctx => {
  const tasks = await getMyTasks()
  let result = ''

  for (let i = 0; i < tasks.length; i++) {
      result = result + `[${i+1}] ${tasks[i]}\n`
  }

  ctx.replyWithHTML(
      '<b>Список ваших задач:</b>\n\n'+
      `${result}`
  )
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

bot.hears('Удалить задачу', ctx => {
  ctx.replyWithHTML(
      'Введите фразу <i>"удалить `порядковый номер задачи`"</i>, чтобы удалить сообщение,'+
      'например, <b>"удалить 3"</b>:'
  )
})

bot.hears(/^удалить\s(\d+)$/, ctx => {
  const id = Number(+/\d+/.exec(ctx.message.text)) - 1
  deleteTask(id)
  ctx.reply('Ваша задача успешно удалена')
})

bot.on('text', ctx => {
  if(!ctx.session)
    ctx.session = {};
  // ctx.session ??= {};

  ctx.session.taskText = ctx.message.text

  ctx.replyWithHTML(
    `Вы действительно хотите добавить задачу:\n\n` +
    `<i>${ctx.message.text}</i>`,
    yesNoKeyboard()
    )
  })

  bot.action(['yes', 'no'], ctx => {
    if (ctx.callbackQuery.data === 'yes') {
      addTask(ctx.session.taskText)
      ctx.editMessageText('Ваша задача успешно добавлена')
    } else {
      ctx.deleteMessage()
    }
  })

bot.launch();
app.listen(PORT, () => console.log(`My server is running on port ${PORT}`));
