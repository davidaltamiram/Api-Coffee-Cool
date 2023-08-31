import { createPool } from 'mysql2/promise';

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'Pa$$w0rd',
    port: '3306',
    database: 'coffeecool'
});
