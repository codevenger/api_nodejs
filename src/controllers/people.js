import People from '../models/people';
import PeopleCommunication from '../models/people_communication';
import CommunicationType from '../models/communication_type';

class PeopleController {

  // List all Peoples
  async index(req, res, next) {
    try {
      const peoples = await People.findAll({
        order: [['id', 'DESC']],
        include: [{
          model: PeopleCommunication,
          as: 'communications',
          attributes: {
            exclude: ['people_id'],
          },
          include: [{
            model: CommunicationType,
            attributes: ['id', 'descrp'],
          }],
        }],
      });
      return res.json(peoples);
    } catch (err) {
      next(err);
    }
  }

  // Create a new People
  async store(req, res, next) {
    try {
      const people = await People.create(req.body,  {
        include: [{
          model: PeopleCommunication,
          as: 'communications',
        }],
      });
      return res.json(people);
    } catch (err) {
      next(err);
    }
  }

  // Show a People
  async view(req, res, next) {
    try {
      const people = await People.findByPk(req.params.id, {
        include: [{
          model: PeopleCommunication,
          as: 'communications',
          attributes: {
            exclude: ['people_id', 'communication_type_id'],
          },
          include: [{
            model: CommunicationType,
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
    } catch (err) {
      next(err);
    }
  }

  // Update People
  async update(req, res, next) {
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
      const communications = req.body.communications;
      if( !communications ) {
        return res.json(newData);
      }

      const allcommunications = [];
      for( const communication of communications ) {
        const { communication_type_id, value } = communication;
        const updComm = await PeopleCommunication.update({ communication_type_id, value }, {
          where: { id: communication.id, people_id: peopleId  },
          returning: true,
        });
        if( updComm[1].length > 0 ) {
          allcommunications.push(...updComm[1]);
        }
      }

      return res.json({ ...newData.dataValues, "communications": allcommunications });
    } catch (err) {
      next(err);
    }
  }

  // Delete
  async delete(req, res, next) {
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
    } catch (err) {
      next(err);
    }
  }
}

export default new PeopleController();
