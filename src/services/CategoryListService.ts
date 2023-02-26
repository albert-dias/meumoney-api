import { Repository } from "typeorm";
import { dataSource } from "../database";
import { Category } from "../entities/Category";

export class CategoryListService {
  private categorysRepository: Repository<Category>

  constructor() {
    this.categorysRepository = dataSource.getRepository(Category);
  }

  public async execute(): Promise<Category[]> {

    const category = await this.categorysRepository.find()

    return category;

  }
}