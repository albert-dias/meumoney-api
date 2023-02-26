import { Repository } from "typeorm";
import { dataSource } from "../database";
import { Category } from "../entities/Category";

interface IRequest {
  color: string;
  name: string;
}

export class CategoryCreateService {
  private categorysRepository: Repository<Category>

  constructor() {
    this.categorysRepository = dataSource.getRepository(Category);
  }

  public async execute({
    color,
    name,
  }: IRequest): Promise<Category> {


    if (!color || !name) {
      throw new Error("Dados incompletos, verifique o formulário")
    }

    const nameTrat = name.toUpperCase().trim();


    const categoryExists = await this.categorysRepository.findOne({
      where: {
        name: nameTrat,
      }
    })

    if (categoryExists) {
      throw new Error('Categoria já cadastrada na nossa base de dados!')
    }


    const category = this.categorysRepository.create({
      color,
      name,
    })

    await this.categorysRepository.save(category);

    return category
  }
}