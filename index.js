const { Telegraf, Markup, Context } = require('telegraf')

    

require('dotenv').config()

const text = require("./const")

const bot = new Telegraf(process.env.BOT)

// ==============================start=================================
bot.start( async (ctx) => {
    try {
        await ctx.replyWithAnimation({source: "./res/xtd.gif"})
    } catch (e) {
        console.error(e)
    }
    
    await ctx.replyWithHTML(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name: ''}` + text.startText)
    try {
        await ctx.replyWithHTML('<b>Выбери свой путь:</b>', Markup.inlineKeyboard([
            [Markup.button.callback('Frontend', 'btn_front'), Markup.button.callback('Backend', 'btn_back')],
            [Markup.button.callback('MobileDev', 'btn_mob'), Markup.button.callback('GameDev', 'btn_game')]
        ]))
    } catch (e) {
        console.error(e)
    }
    
})





//===============================front-three=====================================
    bot.action("btn_front", async (ctx) => {
        try {
            await ctx.answerCbQuery()
            await ctx.replyWithHTML('<b>Выбери уровень своей мощи:</b>', Markup.inlineKeyboard([
                [Markup.button.callback('Junior','btn_jun')],[Markup.button.callback('Middle','btn_mid')],
                [Markup.button.callback('Назад','btn_back_1')]
            ]))
        } catch (error) {
            console.error(error)
        }
    })

//=============================front-jun=================================================
    bot.action("btn_jun", async (ctx) => {
        try {
            await ctx.answerCbQuery()
            await ctx.replyWithHTML('<b>Выбери где будешь питать силу:</b>', Markup.inlineKeyboard([
                [Markup.button.callback('Справочник','btn_jun_sprv'),Markup.button.callback('Марафон','btn_mid_mrfn')],
                [Markup.button.callback('Таймер','btn_jun_t'),Markup.button.callback('Чтиво','btn_mid_ch')]
            ]))
        } catch (error) {
            console.error(error)
        }
    })

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))