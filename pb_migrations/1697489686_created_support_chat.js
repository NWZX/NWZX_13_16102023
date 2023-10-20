/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "6gwxkfv16a4z07m",
    "created": "2023-10-16 20:54:46.491Z",
    "updated": "2023-10-16 20:54:46.491Z",
    "name": "support_chat",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "axphtfsu",
        "name": "status",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "new",
            "open",
            "close"
          ]
        }
      },
      {
        "system": false,
        "id": "ygtmayey",
        "name": "user_id",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6gwxkfv16a4z07m");

  return dao.deleteCollection(collection);
})
