export interface IConnection {

}

export type Connection = {
  id: number;
  player_id: number;
  identifiers: Record<string, string | number>;
  date: string;
}