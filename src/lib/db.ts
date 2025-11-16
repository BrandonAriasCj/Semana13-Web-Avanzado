// Simulación de base de datos en memoria
// En producción, usar una base de datos real (MongoDB, PostgreSQL, etc.)

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  loginAttempts: number;
  lockedUntil?: Date;
}

// Almacenamiento en memoria
const users: User[] = [];

export const db = {
  users: {
    findByEmail: (email: string): User | undefined => {
      return users.find(u => u.email === email);
    },
    
    create: (userData: Omit<User, 'id' | 'createdAt' | 'loginAttempts'>): User => {
      const user: User = {
        ...userData,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
        loginAttempts: 0,
      };
      users.push(user);
      return user;
    },
    
    updateLoginAttempts: (email: string, attempts: number, lockedUntil?: Date) => {
      const user = users.find(u => u.email === email);
      if (user) {
        user.loginAttempts = attempts;
        user.lockedUntil = lockedUntil;
      }
    },
    
    resetLoginAttempts: (email: string) => {
      const user = users.find(u => u.email === email);
      if (user) {
        user.loginAttempts = 0;
        user.lockedUntil = undefined;
      }
    },
  },
};
