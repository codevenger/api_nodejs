module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'access_levels',
    [
      {
        id: '1',
        descrp: 'Administrador',
        descri: 'Administrator',
      },
      {
        id: '3',
        descrp: 'Supervisor',
        descri: 'Manager',
      },
      {
        id: '5',
        descrp: 'Editor',
        descri: 'Edit',
      },
      {
        id: '9',
        descrp: 'Visitante',
        descri: 'Visitor',
      },
    ],
    {},
  ),

  down: () => {},
};
