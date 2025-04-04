import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type classes = {
  id: number;
  name: string;
};
class caractereeClassRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from classes");

    return rows as classes[];
  }

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from classes where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows as classes[];
  }
}
export default new caractereeClassRepository();
