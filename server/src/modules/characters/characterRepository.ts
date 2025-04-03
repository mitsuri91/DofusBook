import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type character = {
  id: number;
  user_id: number;
  class_id: number;
  name: string;
  gender: string;
  level: number;
};

const characterRepository = {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from characters");
    return rows as character[];
  },

  async readById(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT c.id, c.user_id, c.class_id, c.name, c.gender, c.level, cl.name AS class_name 
       FROM characters c
       LEFT JOIN classes cl ON c.class_id = cl.id
       WHERE c.user_id = ?`,
      [id],
    );

    return rows as (character & { class_name: string })[];
  },

  async create(character: Omit<character, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into characters (user_id, class_id, name, gender, level) values (?, ?,?,?,?)",
      [
        character.user_id,
        character.class_id,
        character.name,
        character.gender,
        character.level,
      ],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  },

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from characters where id = ?",
      [id],
    );
    return result.affectedRows;
  },

  async uptade(character: character) {
    const [result] = await databaseClient.query<Result>(
      "update characters set user_id = ?, class_id = ?, name = ?, gender = ?, level = ? where id = ?",
      [
        character.user_id,
        character.class_id,
        character.name,
        character.gender,
        character.level,
        character.id,
      ],
    );
    return result.affectedRows;
  },
};

export default characterRepository;
