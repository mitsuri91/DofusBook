import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type items = {
  id: number;
  name: string;
  category_id: number;
  level_required: number;
};

class ItemsRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from items");
    console.info(rows);
    return rows as items[];
  }

  // The C of CRUD - Create operation

  async create(item: Omit<items, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into items (name, category_id, level_required) values (?, ?,?)",
      [item.name, item.category_id, item.level_required],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from item where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as items;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from adresse where id = ?",
      [id],
    );
    return result.affectedRows;
  }
  async uptade(item: items) {
    const [result] = await databaseClient.query<Result>(
      "update items set name = ?, category_id = ?, level_required = ? where id = ?",
      [item.name, item.category_id, item.level_required, item.id],
    );
    return result.affectedRows;
  }
}

export default new ItemsRepository();
