import jtw from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: ['Login Required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jtw.verify(token, process.env.TOKEN_SECRET);

    const { id, email } = dados;
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: ['Usuário Inválido'],
      });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (e) {
    return res.status(401).json({
      error: ['Token Inválido'],
    });
  }
};
