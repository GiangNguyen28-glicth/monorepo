"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitService = void 0;
const common_1 = require("@nestjs/common");
const amqp = require("amqplib");
const DEFAULT_CHANNEL_ID = 'default_channel';
let RabbitService = class RabbitService {
    constructor() {
        this.channels = {};
        this.hooks = {};
    }
    onModuleDestroy() {
        console.log('Close connection');
        this.connection.close();
    }
    async onModuleInit() {
        await this.connectRmq();
        await this.createChannel();
    }
    async exchange(exchangeRb, channelId = DEFAULT_CHANNEL_ID) {
        const { exchange, type, options } = exchangeRb;
        return await this.channels[channelId].assertExchange(exchange, type, options);
    }
    async bindQueue(bindQueue, channelId = DEFAULT_CHANNEL_ID) {
        const { queue, exchange, routingKey } = bindQueue;
        await this.exchange({ exchange, type: 'direct' });
        await this.assertQueue({ queue });
        return await this.channels[channelId].bindQueue(queue, exchange, routingKey);
    }
    async assertQueue(queueOptions, channelId = DEFAULT_CHANNEL_ID) {
        const { queue, options } = queueOptions;
        return await this.channels[channelId].assertQueue(queue, options);
    }
    async connectRmq() {
        try {
            if (!this.connection) {
                console.log('Open the new connection :D');
                this.connection = await amqp.connect(`amqp://${process.env.RABBIT_USERNAME}:${process.env.RABBIT_PASSWORD}@${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`);
            }
            this.connection.on('error', (async (error) => {
                console.log('Connect error:', error);
                await this.createChannel(this.channelName);
            }).bind(this));
        }
        catch (error) {
            console.log('Connect to Rmq error. Try to reconnect');
            await this.connectRmq();
        }
    }
    async createChannel(channelId = DEFAULT_CHANNEL_ID) {
        var _a, _b;
        if (!this.connection) {
            setTimeout(async () => {
                await this.createChannel(channelId);
            }, 3000);
            return;
        }
        this.channels[channelId] = await this.connection.createChannel();
        (_a = this.channels[channelId]) === null || _a === void 0 ? void 0 : _a.on('error', (async (error) => {
            console.log('Hello error: ', error);
            await this.createChannel(channelId);
        }).bind(this));
        (_b = this.channels[channelId]) === null || _b === void 0 ? void 0 : _b.connection.on('heartbeat', () => {
            console.debug('Received a Heartbeat signal');
        });
        return this.channels[channelId];
    }
    async sendToQueue(queue, msg, channelId = DEFAULT_CHANNEL_ID) {
        try {
            await this.channels[channelId].sendToQueue(queue, Buffer.from(JSON.stringify(msg)), { persistent: true });
        }
        catch (error) {
            await this.sendToQueue(queue, msg, channelId);
        }
    }
    async reject(msg, requeue, channelId = DEFAULT_CHANNEL_ID) {
        await this.channels[channelId].reject(msg, requeue !== null && requeue !== void 0 ? requeue : true);
    }
    async pushToHooks(channelId = DEFAULT_CHANNEL_ID, hook) {
        if (!this.hooks[channelId]) {
            this.hooks[channelId] = [];
        }
        this.hooks[channelId].push(hook);
    }
    async startConsuming(channelId = DEFAULT_CHANNEL_ID) {
        for (const hook of this.hooks[channelId]) {
            await hook(channelId);
        }
    }
    getContent(msg) {
        return JSON.parse(msg.content.toString());
    }
    setChannelName(channelName) {
        this.channelName = channelName;
    }
};
RabbitService = __decorate([
    (0, common_1.Injectable)()
], RabbitService);
exports.RabbitService = RabbitService;
//# sourceMappingURL=rabbitmq.service.js.map