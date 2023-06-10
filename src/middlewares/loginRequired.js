import jwt from 'jsonwebtoken';
import User from '../models/user';
import Signin from '../models/signin';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Você precisa logar no sistema'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, username, email } = payload;

    const user = await User.findOne({
      where: {
        id,
        username,
        email,
      },
      include: [{
        model: Signin,
        where: {
          token,
        },
        required: true,
      }],
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Token Expirado ou Inválido'],
      });
    }

    req.userId = id;
    req.userName = username;
    req.userEmail = email;
    req.userAccess = user.access_level_id;
    return next();
  } catch (e) {
    if(e instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        errors: ['Token expirado, faça o relogin'],
      });
    }

    return res.status(401).json({
      errors: ['Falha ao verificar a autenticação'],
    });
  }
};

