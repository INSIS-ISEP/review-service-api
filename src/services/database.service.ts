import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class DatabaseService {
  private client: Client;

  constructor() {
    this.client = new Client({
      user: 'sa',
      host: 'localhost',
      database: 'acme',
      password: 'gg',
      port: 1521,
    });
  }

  async query(sql: string, params?: any[]): Promise<any> {
    try {
      await this.client.connect();
      console.log('connected');
      const res = await this.client.query(sql, params);
      return res.rows;
    } catch (err) {
      console.log(err);
    } finally {
      await this.client.end();
    }
  }
}
