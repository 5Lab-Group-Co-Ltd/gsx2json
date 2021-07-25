//
const { GoogleSpreadsheet } = require('google-spreadsheet')

module.exports = async (req, res, next) => {
  const sheetId = req.body.sheetId
  const creds = req.body.creds
  let doc
  try {
    doc = new GoogleSpreadsheet(sheetId)
  } catch (err) {
    return res.json(err)
  }
  try {
    await doc.useServiceAccountAuth(creds)
  } catch (err) {
    return res.json(err)
  }
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[req.body.sheetIndex]
  /**
   * [
    {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      organization: req.body.organization,
      title: req.body.title,
      email: req.body.email,
      hear_from: req.body.hear_from,
      note: req.body.note,
    },
  ]
   */
  const resAddRow = await sheet.addRows([req.body.fields])
  // Send email
  return res.json({
    success: true,
    fields: req.body.fields,
  })
  //
}
