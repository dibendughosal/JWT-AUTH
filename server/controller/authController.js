const signup = (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    return res.status(200).json({
        success: true,
        data: {}
    })
}

module.exports = {signup};