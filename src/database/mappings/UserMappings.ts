import { RelationMappings } from 'objection';
import BaseModelDate from '../models/BaseModelDate';

const UserMappings: RelationMappings = {
  opinions: {
    modelClass: 'Opinion',
    relation: BaseModelDate.HasManyRelation,
    join: { from: 'user.id', to: 'opinions.idUser' }
  }
};

export default UserMappings;
