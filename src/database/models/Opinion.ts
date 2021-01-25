import BaseModelDate from './BaseModelDate';

export default class Opinion extends BaseModelDate {
    id: number;
    title: string;
    idUser: number;
    description: string;
    static tableName = 'opinions';
}
