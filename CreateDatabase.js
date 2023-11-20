import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("kasviodb8.db");

export function CreateDatabase() {
  const DATA = [
    {
      id: 1,
      title: "Puut ja pensaat",
      items: [
        {
          external_id: 922,
          name: "mänty",
        },
        {
          external_id: 920,
          name: "kuusi",
        },
        {
          external_id: 889,
          name: "hieskoivu",
        },
        {
          external_id: 888,
          name: "rauduskoivu",
        },
        {
          external_id: 959,
          name: "pihlaja",
        },
        {
          external_id: 875,
          name: "harmaaleppä",
        },
        {
          external_id: 913,
          name: "kataja",
        },
        {
          external_id: 925,
          name: "haapa",
        },
        {
          external_id: 1374,
          name: "paju",
        },
        {
          external_id: 934,
          name: "tuomi",
        },
      ],
    },
    {
      id: 2,
      title: "Varvut",
      items: [
        {
          external_id: 176,
          name: "mustikka",
        },
        {
          external_id: 178,
          name: "puolukka",
        },
        {
          external_id: 177,
          name: "juolukka",
        },
        {
          external_id: 46,
          name: "kanerva",
        },
        {
          external_id: 248,
          name: "variksenmarja",
        },
      ],
    },
    {
      id: 3,
      title: "Ruohovartiset",
      items: [
        {
          external_id: 195,
          name: "metsätähti",
        },
        {
          external_id: 432,
          name: "käenkaali",
        },
        {
          external_id: 101,
          name: "oravanmarja",
        },
      ],
    },
    {
      id: 4,
      title: "Sanikkaiset",
      items: [
        {
          external_id: null,
          name: "riidenlieko",
        },
        {
          external_id: null,
          name: "kallioimarre",
        },
        {
          external_id: null,
          name: "metsänalvejuuri",
        },
      ],
    },
  ];


  db.transaction(
    (tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS plant_group (id integer primary key, title text); "
      );
    },
    () => console.error("Error when crating DB")
  );

  db.transaction(
    (tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS plants (id integer primary key, name text, external_id integer null, plant_group integer forein key); "
      );
    },
    () => console.error("Error when crating DB")
  );

  DATA.forEach((group) => {
    console.log("INSERT", group.title)
    db.transaction((tx) => {
      tx.executeSql("insert or replace into plant_group (id, title) values (?, ?); ", [
        group.id,
        group.title,
      ]);
    }, (err) => console.error("Error when crating DB", err));

    group.items.forEach((item) => {
        console.log("INSERT PLANT", item.name,item.external_id, group.id)

        db.transaction((tx) => {
          tx.executeSql(
            "insert into plants (name, external_id, plant_group) values (?, ?, ?);", [
              item.name, item.external_id, group.id
            ]
          );
        },  (err) => console.error("Error when crating DB", err));
      });

  });
};
