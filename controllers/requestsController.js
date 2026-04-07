const db = require('../config/db');

exports.getRequests = (req, res) => {
  db.query('SELECT * FROM requests', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.addRequest = (req, res) => {
  const { job_id, material, quantity, requested_by } = req.body;
  const request_id = 'REQ-' + Date.now(); // auto-generate unique ID

  db.query(
    'INSERT INTO requests (request_id, job_id, material, quantity, requested_by) VALUES (?,?,?,?,?)',
    [request_id, job_id, material, quantity, requested_by],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, request_id, job_id, material, quantity, requested_by, status: 'Pending' });
    }
  );
};


exports.updateRequestStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.query('UPDATE requests SET status=? WHERE id=?', [status, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Request status updated' });
  });
};

exports.deleteRequest = (req, res) => {
  db.query('DELETE FROM requests WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Request deleted successfully' });
  });
};
