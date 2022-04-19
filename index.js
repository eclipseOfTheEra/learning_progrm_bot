const { Telegraf, Markup } = require('telegraf')

require('dotenv').config()

const text = require("./const")
const bot = new Telegraf(process.env.BOT)
bot.start((ctx) => ctx.reply(`Hiii ${ctx.message.from.first_name ? ctx.message.from.first_name: 'Незнакомец'}!`))
bot.help((ctx) => ctx.reply(text.commands))
bot.command('course', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Kypсы</b>', Markup.inlineKeyboard([
            [Markup.button.callback('Редакторы', 'btn_1'), Markup.button.callback('Обзоры', 'btn_2')],
            [Markup.button.callback('Редакторы', 'btn_1'), Markup.button.callback('Обзоры', 'btn_2')]
        ]))
    } catch (error) {
        console.error(error)
    }
})

function addActionBot(name,src,text){

    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if(src !== false){
                await ctx.replyWithPhoto(
                    {source: src}
                )
            }
            await ctx.replyWithHTML(text, {disable_web_page_preview: true})
        } catch (error) {
            console.error(error)
        }
    })
}
addActionBot('btn_1', './img/Java_logo.png',text.text1)
addActionBot('btn_2', './img/JavaScript-1.jpg',text.text2)
addActionBot('btn_3', false,text.tex3)
addActionBot('btn_4', './img/swift-og.png',text.tex4)



bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

