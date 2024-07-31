const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "USERNAME", uid: "userName", sortable: true },
    { name: "ROLE", uid: "role" },
    { name: "PERMISSIONS", uid: "Permissions" },
    { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
    { name: "Pending", uid: "penfing" },
    { name: "Accepted", uid: "Accepted" },
];



export { columns, statusOptions };
