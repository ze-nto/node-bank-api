import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const secretKey = 'Isto é um grande Segredo';
let users = {} //Simulando o banco de dados

async function getUsers(){
  return users;
}


async function createUser(user){

  const hashedPassword = await bcrypt.hash(user.password, 2);

  users[user.username] = {
    password: hashedPassword,
    role: user.role
  }

  return user;
}

async function login(user){

  const dbUser = users[user.username];

  if(dbUser){
    const pwdMatches = bcrypt.compareSync(user.password, dbUser.password)  

    if(pwdMatches){
      const jwtToken = jwt.sign({role: dbUser.role, curso: 'Node Modulo 2' }, secretKey, { expiresIn: 300} )
      return jwtToken;
    } else {
      throw new Error('Usuário ou senha incorreta.')
    }
  } else {
    throw new Error('Usuário não encontrado.')
  }
}


export default{
  getUsers,
  createUser,
  login,
  secretKey
}