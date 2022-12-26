import { Telegraf } from "telegraf";
export const responceList = ["select", "unselect", "choose"];
import reader from "xlsx";

let data = [];
export const groupIdsArray = () => {
  const file = reader.readFile("./DimasTelegramgroups.xlsx");
  const sheets = file.SheetNames;

  for (let i = 0; i <= sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      if (res.TGID) {
        data.push(res);
      }
    });
  }
  return data;
};
export const selectOptionResponce = data.map((item) => item.TGID);
export const unSelectOptionResponce = data.map((item) => item.TGID);

export const selectSomeMenu = {
  parse_mode: "html",
  reply_markup: JSON.stringify({
    inline_keyboard: data.map((item, index) => {
      if (index == data.length - 1) {
        return [
          {
            text: item.Name,
            callback_data: item.TGID,
          },
        ].concat({ text: "Send", callback_data: "sendSelected" });
      }
      return [
        {
          text: item.Name,
          callback_data: item.TGID,
        },
      ];
    }),
  }),
};
export const selectFilteredMenu = {
  parse_mode: "html",
  reply_markup: JSON.stringify({
    inline_keyboard: data.map((item, index) => {
      if (index == data.length - 1) {
        return [
          {
            text: item.Name,
            callback_data: item.TGID,
          },
        ].concat({ text: "Send", callback_data: "sendFiltered" });
      }
      return [
        {
          text: item.Name,
          callback_data: item.TGID,
        },
      ];
    }),
  }),
};
export const mainMenu = {
  parse_mode: "html",
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: "Select All ",
          callback_data: "select",
        },
      ],
      [
        {
          text: "Selct groups by tags",
          callback_data: "choose",
        },
      ],
      [
        {
          text: "UnSelect Some Groups",
          callback_data: "unselect",
        },
      ],
    ],
  }),
};
