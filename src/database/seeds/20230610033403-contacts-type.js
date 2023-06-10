module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'contacts_type',
    [
      {
        descrp: 'Telefone',
        descri: 'Phone',
      },
      {
        descrp: 'Celular',
        descri: 'Mobile',
      },
      {
        descrp: 'Email',
        descri: 'Email',
      },
      {
        descrp: 'Skype',
        descri: 'Skype',
      },
      {
        descrp: 'Facebook',
        descri: 'Facebook',
      },
      {
        descrp: 'WhatsApp',
        descri: 'WhatsApp',
      },
      {
        descrp: 'Instagram',
        descri: 'Instagram',
      },
      {
        descrp: 'Website',
        descri: 'Website',
      },
      {
        descrp: 'LinkedIn',
        descri: 'LinkedIn',
      },
      {
        descrp: 'Telegram',
        descri: 'Telegram',
      },
    ],
    {},
  ),

  down: () => {},
};
