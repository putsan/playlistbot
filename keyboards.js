import { Markup } from 'telegraf';

export function getMainMenu() {
  return Markup.keyboard([
    ['Мои задачи', 'Добавить задачу'],
    ['Смотивируй меня']
  ])
}

export const yesNoKeyboard = () => (
  Markup.inlineKeyboard([
    Markup.callbackButton('Да', 'yes'),
    Markup.callbackButton('Нет', 'no'),
  ], {columns: 2})
)
