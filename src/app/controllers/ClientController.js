import * as Yup from 'yup';

import Client from '../models/Client';

class ClientController {
  async index(req, res) {
    try {
      const clients = await Client.findAll({
        order: ['name'],
        attributes: ['id', 'name', 'address', 'phone', 'status'],
      });

      return res.json(clients);
    } catch (e) {
      return res
        .status(500)
        .json({ error: 'Something got Wrong with this request' });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const client = await Client.findByPk(id, {
        attributes: ['id', 'name', 'address', 'phone', 'status'],
      });

      if (!client)
        return res.status(400).json({ error: 'Client id not found' });

      return res.json(client);
    } catch (e) {
      return res
        .status(500)
        .json({ error: 'Something got Wrong with this request' });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      phone: Yup.number().required(),
      status: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validation fails: check the field types' });
    }

    const { name, address, phone, status } = req.body;

    try {
      const clientExists = await Client.findOne({
        where: { name, address, phone },
      });

      if (clientExists)
        return res
          .status(400)
          .json({ error: 'User already exists in the database' });

      const client = await Client.create({
        name,
        address,
        phone,
        status,
      });

      return res.json(client);
    } catch (e) {
      return res
        .status(500)
        .json({ error: 'Something got Wrong with this request' });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      address: Yup.string(),
      phone: Yup.number(),
      status: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validation fails: check the field types' });
    }

    const { id } = req.params;
    const { name, address, phone, status } = req.body;

    try {
      const client = await Client.findByPk(id, {
        attributes: ['id', 'name', 'address', 'phone', 'status'],
      });

      if (!client)
        return res.status(400).json({ error: 'Client id not found' });

      if (
        client.name === name &&
        client.address === address &&
        client.phone === phone &&
        client.status === status
      )
        return res
          .status(400)
          .json({ error: 'Client already exists on database' });

      const updatedClient = await client.update({
        name,
        address,
        phone,
        status,
      });

      return res.json({
        id: updatedClient.id,
        name: updatedClient.name,
        address: updatedClient.address,
        phone: updatedClient.phone,
        status: updatedClient.status,
      });
    } catch (e) {
      return res
        .status(500)
        .json({ error: 'Something got Wrong with this request' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const client = await Client.findByPk(id, {
        attributes: ['id', 'name', 'address', 'phone', 'status'],
      });

      if (!client)
        return res.status(400).json({ error: 'Client id not found' });

      if (client.status === 'excluído')
        return res
          .status(400)
          .json({ error: 'Client status is already excluído' });

      client.status = 'excluído';

      await client.save();

      return res.json(client);
    } catch (e) {
      return res
        .status(500)
        .json({ error: 'Something got Wrong with this request' });
    }
  }
}

export default new ClientController();
