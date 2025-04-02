// import databaseClient from "../../../database/client";

// import type { Result, Rows } from "../../../database/client";

// type inventory = {
//   id: number;
//   character_id: number;
//   item_id: number;
// };

// const inventoryRepository = {
//   async readAll() {
//     const [rows] = await databaseClient.query<Rows>("select * from inventory");
//     return rows as inventory[];
//   }

//   async readById(id: number) {
//     const [rows] = await databaseClient.query<Rows>(
//       "select * from inventory where id = ?",
//       [id],
//     );
//     return rows[0] as inventory;
//   }
//   async create(inventory: Omit<inventory, "id">) {
//     // Execute the SQL INSERT query to add a new item to the "item" table
//     const [result] = await databaseClient.query<Result>(
//       "insert into inventory (character_id, item_id) values (?, ?)",
//       [inventory.character_id, inventory.item_id],
//     );

//     // Return the ID of the newly inserted item
//     return result.insertId;
//   }
//   async delete(id: number) {
//     const [result] = await databaseClient.query<Result>(
//       "delete from inventory where id = ?",
//       [id],
//     );
//     return result.affectedRows;
//   }
//   async uptade(inventory: inventory) {
//     const [result] = await databaseClient.query<Result>(
//       "update inventory set character_id = ?, item_id = ? where id = ?",
//       [inventory.character_id, inventory.item_id, inventory.id],
//     );
//     return result.affectedRows;
//   }
// };
// export default inventoryRepository;
