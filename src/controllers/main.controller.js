const startTime = new Date();

const RootController = async (req, res) => {
  res.send(`
    <div style="text-align:center;font-size:150%">
        Aguamenti server running since ${startTime.toUTCString()}
    </div>
    `);
};

module.exports = { RootController };
