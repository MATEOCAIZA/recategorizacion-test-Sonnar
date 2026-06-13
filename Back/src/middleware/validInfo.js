module.exports = (req, res, next) => {
    const { email, password } = req.body;

    function validateEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    };

    if (req.path === 'register') {
        if (![email, password].every(Boolean)) {
            return res.status(401).json('Credenciales incompletas.');
        } else if (!validateEmial(email)) {
            return res.status(401).json('Correo electrónico inválido.');
        };
    } else if (req.path === 'login') {
        if (![email, password].every(Boolean)) {
            return res.status(401).json('Credenciales incompletas');
        } else if (!validateEmail(email)) {
            return res.status(401).json('Correo electrónico inválido.');
        };
    };
    next();
};