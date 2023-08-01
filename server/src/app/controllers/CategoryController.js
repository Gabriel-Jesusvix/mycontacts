const CategoriesRepository = require('../repositories/CategoriesRepository');
const isValidUUIID = require('../utils/IsValidUUID')
class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();

    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;
    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create({ name });

    response.status(201).json(category);
  }

  async delete(request, response) {
    const { id } = request.params;
    if(!isValidUUIID(id)) {
      return response.status(400).json({error: 'Invalid category id'});
    }
    await CategoriesRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
