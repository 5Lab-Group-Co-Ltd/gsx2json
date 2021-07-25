//
const { GoogleSpreadsheet } = require('google-spreadsheet')

module.exports = async (req, res, next) => {
  const sheetId = req.body.sheetId
  const creds = req.body.creds
  const doc = new GoogleSpreadsheet(sheetId)
  await doc.useServiceAccountAuth(creds)
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[2]
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
  return {
    success: true,
    fields: req.body.fields,
  }
  //
}
