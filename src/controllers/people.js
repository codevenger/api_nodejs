import People from '../models/people';
import PeopleContact from '../models/people_contact';
import ContactType from '../models/contact_type';

class PeopleController {

  // List all Peoples
  async index(req, res) {
    try {
      const peoples = await People.findAll({
        order: [['id', 'DESC']],
        include: [{
          model: PeopleContact,
          as: 'contacts',
          attributes: {
            exclude: ['people_id', 'contact_type_id'],
          },
          include: [{
            model: ContactType,
            attributes: ['id', 'descrp'],
          }],
        }],
      });
      return res.json(peoples);
    } catch (e) {
      if(e.errors) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
      return res.status(400).json({
        errors: [ e.message ]
      });
    }
  }

  // Create a new People
  async store(req, res) {
    if (!req.userAccess || req.userAccess > 5) {
      return res.status(403).json({
        errors: ['Acesso negado'],
      });
    }
    try {
      const people = await People.create(req.body,  {
        include: [{
          model: PeopleContact,
          as: 'contacts',
        }],
      });
      return res.json(people);
    } catch (e) {
      if(e.errors) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
      return res.status(400).json({
        errors: [ e.message ]
      });
    }
  }

  // Show a People
  async view(req, res) {
    try {
      const people = await People.findByPk(req.params.id, {
        include: [{
          model: PeopleContact,
          as: 'contacts',
          attributes: {
            exclude: ['people_id', 'contact_type_id'],
          },
          include: [{
            model: ContactType,
            attributes: ['id', 'descrp'],
          }],
        }],
      });

      if (!people) {
        return res.status(404).json({
          errors: ['Registro não existe'],
        });
      }

      return res.json(people);
    } catch (e) {
      if(e.errors) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
      return res.status(400).json({
        errors: [ e.message ]
      });
    }
  }

  // Update People
  async update(req, res) {
    if (!req.userAccess || req.userAccess > 5) {
      return res.status(403).json({
        errors: ['Acesso negado'],
      });
    }
    try {
      const peopleId = req.params.id;

      if (!peopleId) {
        return res.status(400).json({
          errors: ['Código não informado'],
        });
      }

      const people = await People.findByPk(peopleId);
      if (!people) {
        return res.status(404).json({
          errors: ['Registro não existe'],
        });
      }

      const newData = await people.update(req.body);
      const contacts = req.body.contacts;
      if( !contacts ) {
        return res.json(newData);
      }

      const allContacts = [];
      for( const contact of contacts ) {
        const { contact_type_id, value } = contact;
        const newContact = await PeopleContact.update({ contact_type_id, value }, {
          where: { id: contact.id, people_id: peopleId  },
          returning: true,
        });
        if( newContact[1].length > 0 ) {
          allContacts.push(...newContact[1]);
        }
      }

      return res.json({ ...newData.dataValues, "contacts": allContacts });
    } catch (e) {
      if(e.errors) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
      return res.status(400).json({
        errors: [ e.message ]
      });
    }
  }

  // Delete
  async delete(req, res) {
    if (!req.userAccess || req.userAccess > 5) {
      return res.status(403).json({
        errors: ['Acesso negado'],
      });
    }
    try {
      const peopleId = req.params.id;

      if (!peopleId) {
        return res.status(400).json({
          errors: ['Código não informado'],
        });
      }

      const people = await People.findByPk(peopleId);
      if (!people) {
        return res.status(404).json({
          errors: ['Registro não existe'],
        });
      }

      await people.destroy();
      return res.json({ deleted: peopleId });
    } catch (e) {
      if(e.errors) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
      return res.status(400).json({
        errors: [ e.message ]
      });
    }
  }
}

export default new PeopleController();
