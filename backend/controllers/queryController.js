const db = require('../config/db')

// Add new query
exports.contact = (req, res) => {
  const { name, email, mobilenumber, message } = req.body

  if (!name || !email || !mobilenumber || !message) {
    return res.status(400).json({
      status: 400,
      message: 'Please fill the form'
    })
  }

  const today = new Date().toISOString().split('T')[0]
  const created_at = new Date()

  const checkSql =
    'SELECT id FROM contact WHERE (email = ? OR mobilenumber = ?) AND DATE(created_at) = ?'

  db.query(checkSql, [email, mobilenumber, today], (err, rows) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Internal server error' })
    }

    if (rows.length > 0) {
      return res.status(409).json({
        message: 'You have already submitted a query today'
      })
    }

    const insertSql =
      'INSERT INTO contact (name, email, mobilenumber, message, created_at) VALUES (?, ?, ?, ?, ?)'

    db.query(
      insertSql,
      [name, email, mobilenumber, message, created_at],
      (err, result) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ message: 'Internal server error' })
        }

        res.status(200).json({
          message: 'Contact form submitted successfully',
          id: result.insertId
        })
      }
    )
  })
}


// Show all queries
exports.contactlist = (req, res) => {
  db.query('SELECT * FROM contact', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.status(200).json(rows)
  })
}


// Show single query by mobile number
exports.singlecontactlist = (req, res) => {
  const mobilenumber = req.params.mobilenumber

  db.query(
    'SELECT * FROM contact WHERE mobilenumber = ?',
    [mobilenumber],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      if (rows.length === 0) {
        return res.status(404).json({ message: 'No contact found' })
      }
      res.status(200).json(rows)
    }
  )
}


// Delete Query
exports.deletequery = (req, res) => {
  const id = req.params.id

  db.query('DELETE FROM contact WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.status(200).json({ message: 'Deleted successfully' })
  })
}
