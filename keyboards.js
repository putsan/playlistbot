import { Markup } from 'telegraf';

export function getMainMenu() {
  return Markup.keyboard([
    ['Мои задачи', 'Удалить задачу'],
    ['Смотивируй меня']
  ])
}

export const yesNoKeyboard = () => (
  Markup.inlineKeyboard([
    Markup.button.callback('Да', 'yes'),
    Markup.button.callback('Нет', 'no'),
  ], {columns: 2})
)
