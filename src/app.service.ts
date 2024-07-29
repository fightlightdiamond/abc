import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  @Client({ transport: Transport.TCP })
  client: ClientProxy;

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  async getHello() {
    return this.accumulate();
  }

  async accumulate() {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3, 9];
    return lastValueFrom(this.client.send<number>(pattern, payload));
  }
}
