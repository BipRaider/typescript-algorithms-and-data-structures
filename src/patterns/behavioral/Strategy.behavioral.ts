class UserForStrategy {
  gitHabToken: string;
  jwtToken: string;
}

interface IAuthStrategy {
  auth(user: UserForStrategy): boolean;
}

class Auth {
  constructor(private strategy: IAuthStrategy) {}

  setStrategy(strategy: IAuthStrategy): void {
    this.strategy = strategy;
  }
  public authUser(user: UserForStrategy) {
    return this.strategy.auth(user);
  }
}

class JWTStrategy implements IAuthStrategy {
  auth(user: UserForStrategy): boolean {
    if (user.jwtToken) return true;
    return false;
  }
}
class GitHabStrategy implements IAuthStrategy {
  auth(user: UserForStrategy): boolean {
    if (user.gitHabToken) return true;
    return false;
  }
}

const userJWT = new UserForStrategy();
const userGitHab = new UserForStrategy();

userJWT.jwtToken = 'token';
userGitHab.gitHabToken = 'token';

const auth = new Auth(new JWTStrategy());
console.log('jwt ->', auth.authUser(userJWT));
console.log('if not jwt strategy token ->', auth.authUser(userGitHab));

// update strategy
auth.setStrategy(new GitHabStrategy());
console.log('gitHab ->', auth.authUser(userGitHab));
