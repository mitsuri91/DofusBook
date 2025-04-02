import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type categories = {
  id: number;
  name: string;
};
class categoriesRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from categories");

    return rows as categories[];
  }
}
export default new categoriesRepository();
