const inputValidate = async (req, res) => {
    res.status(200).send({
        success: {
            msg: "valid Input"
        }
    });
};

module.exports = { inputValidate };