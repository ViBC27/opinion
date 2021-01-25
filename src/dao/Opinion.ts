import OpinionModel from '@Models/Opinion';

export default class Opinion {
    public async getOpinionsByUserId(idUser: number) {
        return await OpinionModel.query().select().where({ idUser });
    }

    public async getOpinionById(id: number) {
        return await OpinionModel.query().select().where({ id }).first();
    }

    public async removeOpinionById(id: number) {
        return await OpinionModel.query().delete().where({ id });
    }

    public async addOpinion(opinion: any) {
        return await OpinionModel.query().insert(opinion);
    }

    public async updateOpinionById(id: number, opinion: any) {
        return await OpinionModel.query().patch(opinion).where({ id });
    }
}
