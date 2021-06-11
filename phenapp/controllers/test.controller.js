
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };

exports.observerTest = (req, res) => {
    res.status(200).send("Observer Content.");
};

exports.adminTest = (req, res) => {
    res.status(200).send("Admin Content.");
};