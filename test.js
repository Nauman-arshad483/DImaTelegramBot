import { Telegraf } from "telegraf";
let bot = new Telegraf("5873092990:AAFOum7t5HN708PfoRHpdylE35Yo9VVSj9Y");
let message = "";
import {
  mainMenu,
  groupIdsArray,
  selectSomeMenu,
  selectFilteredMenu,
  responceList,
  selectOptionResponce,
  unSelectOptionResponce,
} from "./service.js";
let data = groupIdsArray();
// console.log("data is", data);
let unSelectOptionAction = unSelectOptionResponce;
selectOptionResponce.push("sendSelected");
unSelectOptionResponce.push("sendFiltered");
let selectOptionAction = [];
bot.start((ctx) => {
  ctx.reply("Enter Text");
});
bot.on("text", (ctx) => {
  message = ctx.update.message.text;
  ctx
    .reply(
      bot.telegram
        .sendMessage(5087892557, "choose option to send text", mainMenu)
        .then((res) => {
          bot.action(responceList, async (ctx) => {
            let res = ctx.match.input;
            ctx.editMessageReplyMarkup({
              reply_markup: {
                inline_keyboard: [],
              },
            });
            if (res === "select") {
              data.map(async (item) => {
                console.log(item.TGID);
                bot.telegram
                  .sendMessage(item.TGID, message)
                  .then(() => {
                    console.log(message, "Message to all groups succeed");
                  })
                  .catch((error) => {
                    // console.log(error);
                    console.log("option 1 execution failed");
                  });
              });
            } else if (res == "choose") {
              bot.telegram
                .sendMessage(5087892557, "Select Groups", selectSomeMenu)
                .then(() => {
                  bot.action(selectOptionResponce, async (ctx) => {
                    let res = ctx.match.input;
                    console.log(res);
                    if (res == "sendSelected") {
                      if (selectOptionAction.length == 0) {
                        bot.telegram.sendMessage(
                          5087892557,
                          "No group selected"
                        );
                      }
                      selectOptionAction.map(async (item) => {
                        bot.telegram
                          .sendMessage(item, message)
                          .then(() => {
                            console.log("Message to selected groups succeed");
                          })
                          .catch((error) => {
                            console.log("Message to selected groups failed");
                          });
                      });
                    } else {
                      selectOptionAction.push(res);
                    }
                  });
                })
                .catch((error) => {
                  console.log("option 2 execution failed");
                });
            } else {
              console.log("choose option");
              bot.telegram
                .sendMessage(5087892557, "un select Groups", selectFilteredMenu)
                .then(() => {
                  bot.action(unSelectOptionResponce, async (ctx) => {
                    let res = ctx.match.input;
                    console.log(res);
                    if (res == "sendFiltered") {
                      if (unSelectOptionAction.length == 0) {
                        bot.telegram.sendMessage(
                          5087892557,
                          "No group selected"
                        );
                      }
                      unSelectOptionAction.map(async (item) => {
                        bot.telegram
                          .sendMessage(item, message)
                          .then(() => {
                            console.log("Message to filtered groups succeed");
                          })
                          .catch((error) => {
                            console.log("Message to filtered groups failed");
                          });
                      });
                    } else {
                      unSelectOptionResponce.map((e) => {
                        if (e == res) {
                          const index = unSelectOptionAction.indexOf(res);
                          unSelectOptionAction.splice(index, 1);
                        }
                      });
                    }
                  });
                })
                .catch((error) => {
                  console.log("option 3 execution failed");
                });
            }
          });
        })
        .catch((errr) => {
          console.log("catch error");
        })
    )

    .then(() => {
      console.log("choose option");
    })
    .catch(() => {
      console.log("option error");
    });
});
bot.launch();
