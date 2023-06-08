module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'languages',
    [
      {
        abbr: 'pt_BR',
        descrp: 'Português do Brasil',
        descri: 'Brazilian Portuguese',
      },
      {
        abbr: 'en_US',
        descrp: 'Inglês',
        descri: 'English',
      },
      {
        abbr: 'es_ES',
        descrp: 'Espanhol',
        descri: 'Spanish',
      },
    ],
    {},
  ),

  down: () => {},
};
