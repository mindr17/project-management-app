export const columns = [
  {
    "_id": "0",
    "title": "Column title 1",
    "order": 1,
    "boardId": "Id of boards"
  },
  {
    "_id": "1",
    "title": "Column title 2",
    "order": 1,
    "boardId": "Id of boards"
  },
];

export const tasks = [
  {
    "_id": "0",
    "title": "Task title 1",
    "order": 0,
    "boardId": "id of board",
    "columnId": "0",
    "description": "Task decription",
    "userId": "userId of task owner",
    "users": [
      "userId of responsible user #1",
      "userId of responsible user #2"
    ]
  },
  {
    "_id": "1",
    "title": "Task title 2",
    "order": 0,
    "boardId": "id of board",
    "columnId": "1",
    "description": "Task decription",
    "userId": "userId of task owner",
    "users": [
      "userId of responsible user #1",
      "userId of responsible user #2"
    ]
  },
];
