import { Op } from 'sequelize';
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
      return next(err);
    }
  }

  // Create a new People
  async store(req, res, next) {
    try {
      const people = await People.create(req.body, {
        include: [{
          model: PeopleCommunication,
          as: 'communications',
        }],
      });
      return res.json(people);
    } catch (err) {
      return next(err);
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
      return next(err);
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
      const { communications } = req.body;
      if (!communications) {
        return res.json(newData);
      }

      const promises = communications.map(async (communication) => {
        const { id, communication_type_id: communicationTypeId, value } = communication;
        if (id) {
          const updComm = await PeopleCommunication.update({ communicationTypeId, value }, {
            where: { id, people_id: peopleId },
            returning: true,
          });
          return updComm[1][0];
        }
        const newComm = await PeopleCommunication.create({
          people_id: peopleId,
          communication_type_id: communicationTypeId,
          value,
        });
        return newComm;
      });

      const allcomm = await Promise.all(promises);
      allcomm.filter((i) => i);

      const allcommIds = allcomm.map((i) => i.id);
      await PeopleCommunication.destroy({
        where: { people_id: peopleId, id: { [Op.notIn]: allcommIds } },
      });

      return res.json({ ...newData.dataValues, communications: allcomm });
    } catch (err) {
      return next(err);
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
      return next(err);
    }
  }
}

export default new PeopleController();
