export interface IRedisSet {
  key: string;
  value: string;
  ttl?: number;
}
