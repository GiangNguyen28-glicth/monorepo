import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { RabbitAssertExchange, RabbitAssertQueue } from './rabbitmq.assert';
import { IExchangeRb, IQueue, IQueueBinding } from './rabbitmq.interfaces';
export declare class RabbitService implements OnModuleInit, OnModuleDestroy {
    private channels;
    private hooks;
    private connection;
    private channelName;
    onModuleDestroy(): void;
    onModuleInit(): Promise<void>;
    exchange(exchangeRb: IExchangeRb, channelId?: string): Promise<RabbitAssertExchange>;
    bindQueue(bindQueue: IQueueBinding, channelId?: string): Promise<any>;
    assertQueue(queueOptions: IQueue, channelId?: string): Promise<RabbitAssertQueue>;
    connectRmq(): Promise<void>;
    createChannel(channelId?: string): Promise<ConfirmChannel>;
    sendToQueue(queue: string, msg: any, channelId?: string): Promise<void>;
    reject(msg: ConsumeMessage, requeue?: boolean, channelId?: string): Promise<void>;
    pushToHooks(channelId: string, hook: () => Promise<void>): Promise<void>;
    startConsuming(channelId?: string): Promise<void>;
    getContentFromMessage(msg: ConsumeMessage): any;
    setChannelName(channelName: string): void;
}
