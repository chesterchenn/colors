const SQL = {
  insertFontStyle: `INSERT INTO font_style(font_color, font_name, font_zh_name) VALUES ('#000000', 'black', '黑色')`,
  selectAllFromFont: `SELECT * FROM font_style`,
}

module.exports = SQL;
