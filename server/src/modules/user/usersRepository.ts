import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type user = {
  id: number;
  name: string;
  email: string;
  password: string;
};

class userRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from users");
    console.info(rows);
    return rows;
  }

  // The C of CRUD - Create operation

  async create(
    users: Omit<{ name: string; email: string; password: string }, "id">,
  ) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into users (name, email, password) values (?, ?,?)",
      [users.name, users.email, users.password],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from users where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as user;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from users where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}
export default new userRepository();
