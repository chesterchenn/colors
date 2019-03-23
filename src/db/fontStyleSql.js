const fontStyleSql = {
  insertFontStyle: `INSERT INTO font_style(font_color, font_name, font_zh_name) VALUES (?, ?, ?)`,
  selectAllFromFontStyle: `SELECT * FROM font_style`,
}

module.exports = fontStyleSql;
